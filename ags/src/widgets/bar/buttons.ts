import Config from "src/lib/config"
import Icons from "src/lib/icons"
import { idleState } from "src/lib/variables"

const Notifications = await Service.import("notifications")

export const LauncherButton = () =>
    Widget.Button({
        className: "bar-menu-button",
        cursor: "pointer",
        child: Widget.Icon(Icons.nixos),
        onClicked: async () =>
            await Utils.execAsync("rofi -show drun").catch((e) => print(e)),
    })
export const PowerButton = () =>
    Widget.Button({
        className: "bar-power-button",
        cursor: "pointer",
        child: Widget.Icon(Icons.power.shutdown),
        onClicked: () => App.toggleWindow("power"),
    })

export const ToolsTray = () =>
    Widget.Box({
        vpack: "center",
        hpack: "center",
        className: "bar-tool-tray",
        children: [
            Widget.Button({
                cursor: "pointer",
                child: Widget.Icon(Icons.colorPicker),
                onClicked: async () =>
                    await Utils.execAsync(Config.commands.colorPicker),
            }),

            Widget.Button({
                cursor: "pointer",
                child: Widget.Icon({
                    icon: idleState
                        .bind()
                        .as((state) =>
                            state ? Icons.idlehint.on : Icons.idlehint.off,
                        ),
                }),
                onClicked: async () => {
                    idleState.setValue(!idleState.value)
                    await Utils.execAsync(
                        idleState.value
                            ? Config.commands.matcha.on
                            : Config.commands.matcha.off,
                    )
                },
            }),
            Widget.Button({
                cursor: "pointer",
                child: Widget.Icon().hook(Notifications, (self) => {
                    self.icon = Notifications.dnd
                        ? Icons.notification.off
                        : Icons.notification.on
                }),
                onClicked: async () => {
                    await Notifications.clear()
                    Notifications.dnd = !Notifications.dnd
                },
            }),
        ],
    })
