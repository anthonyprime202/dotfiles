import Icons from "src/lib/icons"
import Brightness from "src/lib/services/brightness"

const Audio = await Service.import("audio")

const BrightnessInfo = () =>
    Widget.Box({
        className: "bar-brightness-info",
        spacing: 5,
        children: [
            Widget.Icon(Icons.brightness),
            Widget.Label().bind(
                "label",
                Brightness,
                "brightness",
                (brightness) => `${Math.round(brightness * 100)}%`,
            ),
        ],
    })
type Stream = "speaker" | "microphone"

const getIcon = (stream: Stream) => {
    const volume = Audio[stream].volume
    const isMuted = Audio[stream].volume == 0 || Audio[stream].stream?.is_muted
    if (isMuted) return Icons[stream].muted
    if (stream === "speaker") {
        if (volume < 0.3) return Icons.speaker.low
        if (volume < 0.7) return Icons.speaker.medium
        return Icons.speaker.high
    }
    return Icons.microphone.normal
}

const getLabel = (stream: Stream) => {
    const isMuted = Audio[stream].volume == 0 || Audio[stream].stream?.is_muted
    if (isMuted) return "Mute"
    return `${Math.round(Audio[stream].volume * 100)}%`
}

const VolumeInfo = (stream: Stream) =>
    Widget.Box({
        spacing: 5,
        className: `bar-${stream}-info`,
        setup(self) {
            self.hook(Audio, () => {
                const icon = Widget.Icon({
                    icon: getIcon(stream),
                })
                const label = Widget.Label({
                    label: getLabel(stream),
                })
                self.children = [icon, label]
            })
        },
    })

export default () =>
    Widget.Box({
        className: "bar-info-widget",
        children: [
            BrightnessInfo(),
            VolumeInfo("microphone"),
            VolumeInfo("speaker"),
        ],
    })
