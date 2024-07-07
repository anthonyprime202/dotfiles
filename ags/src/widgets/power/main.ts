import Config from "src/lib/config"
import Icons from "src/lib/icons"

import { powerMenuCommand } from "src/lib/variables"

const CreateButton = (type: string) =>
    Widget.Button({
        className: `power-${type}-button`,
        child: Widget.Icon(Icons.power[type]),
        onClicked: () => {
            App.closeWindow("power")
            powerMenuCommand.setValue(type)
            App.openWindow("confirm-window")
        },
    })

const PowerMenuWidget = () =>
    Widget.Box({
        className: "power-widget",
        children: Array.from(Config.powerMenu, (opt) => CreateButton(opt)),
    })

const ConfirmWindowContainer = () =>
    Widget.Box({
        className: "confirm-window-container",
        vertical: true,
        children: [
            Widget.Label("Are you sure?"),
            Widget.Box({
                children: [
                    Widget.Button({
                        label: "Yes",
                        className: "confirm-yes-button",
                        onClicked: powerMenuCommand.bind().as((cmd) => () => {
                            App.closeWindow("confirm-window")
                            Utils.exec(Config.commands.power[cmd])
                        }),
                    }),
                    Widget.Button({
                        label: "No",
                        className: "confirm-no-button",
                        onClicked: () => App.closeWindow("confirm-window"),
                    }),
                ],
            }),
        ],
    })

const PowerMenuPopup = () =>
    Widget.Box({
        css: "padding-top:2px",
        children: [
            Widget.Revealer({
                transition: "slide_up",
                transitionDuration: Config.animation.widgets,
                child: PowerMenuWidget(),
                setup(self) {
                    self.hook(App, (_, wname, visible) => {
                        if (wname === "power") {
                            self.reveal_child = visible
                        }
                    })
                },
            }),
        ],
    })

export const PowerMenu = () =>
    Widget.Window({
        css: "background: none",
        name: "power",
        anchor: ["bottom"],
        layer: "overlay",
        keymode: "exclusive",
        visible: false,
        child: PowerMenuPopup(),
        margins: [5, 5, 0, 5],
        setup: (self) =>
            self.keybind("Escape", () => {
                App.closeWindow("power")
            }),
    })

export const ConfirmWindow = () =>
    Widget.Window({
        name: "confirm-window",
        css: "background: none",
        layer: "overlay",
        keymode: "exclusive",
        visible: false,
        child: ConfirmWindowContainer(),
        setup: (self) => {
            self.keybind("Escape", () => {
                App.closeWindow("confirm-window")
            })
        },
    })
