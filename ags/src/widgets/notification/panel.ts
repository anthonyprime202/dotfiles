import Icons from "src/lib/icons"
import Notification from "./notification"
import Config from "src/lib/config"

const Notifications = await Service.import("notifications")

const NotificationPanelWidget = () =>
    Widget.Box({
        className: "notification-panel-widget",
        vertical: true,
        setup(self) {
            // Header
            const header = Widget.CenterBox({
                className: "notification-panel-header",
                start_widget: Widget.Label({
                    hpack: "start",
                    label: "Notifications",
                }),
                end_widget: Widget.Button({
                    hpack: "end",
                    label: "Clear",
                    onClicked: () => Notifications.clear(),
                }),
            })

            // Cover Page
            const cover = Widget.Box({
                vertical: true,
                hpack: "center",
                vpack: "center",
                hexpand: true,
                vexpand: true,
                className: "notification-panel-cover",
                children: [
                    Widget.Icon({
                        icon: Icons.notification.off,
                    }),
                    Widget.Label({
                        label: "No Notifications",
                    }),
                ],
            })

            // Notifications Container
            const container = Widget.Box({ vertical: true, vpack: "start" })
            const notificationList = new Map()
            const onNotify = (_: unknown, id: number) => {
                const notif = Notifications.getNotification(id)
                if (!notif) return

                let first = false
                const replace = notificationList.get(id)
                if (replace) {
                    const keys = Array.from(notificationList.keys())
                    if (keys[keys.length - 1] === id) first = true
                    replace.destroy(first)
                }

                const notification = Notification(notif, false, first)
                container.children = [notification, ...container.children]
                notificationList.set(id, notification)
            }

            const onClosed = (_: unknown, id: number) => {
                if (!notificationList.get(id)) return

                notificationList.get(id).attribute.destroy(false, true)
                notificationList.delete(id)
            }

            self.add(header)
            self.add(
                Widget.Box({
                    className: "notification-panel-wrapper",
                    child: Widget.Stack({
                        children: {
                            container: Widget.Scrollable({
                                className: "notification-panel-container",
                                child: container,
                                hscroll: "never",
                                hpack: "center",
                                vscroll: "automatic",
                            }),
                            cover,
                        },
                        setup(self) {
                            self.hook(Notifications, () => {
                                self.shown = Notifications.notifications.length
                                    ? "container"
                                    : "cover"
                            })
                        },
                    }),

                })
            )

            Utils.timeout(300, () => {
                Notifications.notifications.forEach((notif) => {
                    onNotify(self, notif.id)
                })
            })

            self.hook(Notifications, onNotify, "notified")
            self.hook(Notifications, onClosed, "closed")
        },
    })

const PanelRevealer = () =>
    Widget.Box({
        css: "padding-right: 2px;",
        child: Widget.Revealer({
            child: NotificationPanelWidget(),
            transition: "slide_right",
            transitionDuration: Config.animation.widgets,
            setup(self) {
                self.hook(App, (_, wname, visible) => {
                    if (wname === "panel") {
                        self.reveal_child = visible
                    }
                })
            },
        }),
    })

export default () =>
    Widget.Window({
        name: "panel",
        css: "background: none",
        layer: "overlay",
        visible: false,
        anchor: ["left"],
        keymode: "exclusive",
        child: PanelRevealer(),
        setup: (self) => {
            self.keybind("Escape", () => {
                App.closeWindow("panel")
            })
        },
    })
