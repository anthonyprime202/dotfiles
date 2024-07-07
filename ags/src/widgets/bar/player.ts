import { MprisPlayer } from "types/service/mpris.js"
import Icons from "../../lib/icons.js"
import Config from "../../lib/config"

const Mpris = await Service.import("mpris")

const getPlayer = () => Mpris.getPlayer("spotify") || Mpris.getPlayer()

const accentColorCache = {}
const getAccentColor = async (image: string) => {
    const command = `magick ${image} -colors 2 -quantize RGB -unique-colors txt:- | awk '{ print $3 }' | tail -n 1`
    return await Utils.execAsync(`sh -c "${command}"`)
        .then((res) => (res.length > 7 ? res.slice(0, 7) : res))
        .then((res) => res.trim())
        .catch(print)
}

const labelParser = (player: MprisPlayer | null) => {
    const trackArtists = player?.track_artists?.join(", ")
    return `${trackArtists?.concat(trackArtists ? " - " : "")}${player?.track_title}`
}

const PlayerProgress = () =>
    Widget.CircularProgress({
        className: "bar-player-progress",
        hpack: "center",
        vpack: "center",
        startAt: 0.75,
        rounded: true,
        setup: (self) => {
            self.poll(1000, () => {
                const player = getPlayer()
                self.value = player ? player.position / player.length : 1
            })
            self.hook(Mpris, async () => {
                const player = getPlayer()
                if (!player?.cover_path) return
                let accentColor: string | void
                if (accentColorCache[player?.cover_path]) {
                    accentColor = accentColorCache[player?.cover_path]
                } else {
                    accentColor = await getAccentColor(
                        player?.cover_path,
                    ).catch(print)
                    accentColorCache[player?.cover_path] = accentColor
                }
                Object.keys(accentColorCache).forEach((path) => {
                    if (path !== player?.cover_path) {
                        delete accentColorCache[path]
                    }
                })
                if (accentColor != "") {
                    self.css = `color: ${accentColor};`
                }
            })
        },

        child: Widget.Icon({ className: "bar-player-icon" }).hook(
            Mpris,
            (self) => {
                self.icon = `${
                    getPlayer()?.play_back_status === "Playing"
                        ? Icons.player.pause
                        : Icons.player.play
                }`
            },
        ),
    })

const PlayerWidget = () =>
    Widget.EventBox({
        cursor: "pointer",
        child: Widget.Box({
            className: "bar-player-widget",
            spacing: 10,
            children: [
                PlayerProgress(),
                Widget.Label({
                    truncate: "end",
                    max_width_chars: 40,
                }).hook(Mpris, (self) => {
                    self.label = labelParser(getPlayer())
                }),
            ],
        }),
        onPrimaryClick: () => getPlayer()?.playPause(),
    })

export default () =>
    Widget.Revealer({
        child: PlayerWidget(),
        // @ts-ignore
        revealChild: Mpris.bind("players").as((p) => p.length),
        transition: "slide_right",
        transitionDuration: Config.animation.player,
    })
