import Popup from "./notification"

const Notifications = await Service.import("notifications")
const NotificationPopupsWidget = () =>
    Widget.Box({
        vertical: true,
        css: "padding: 2px 0px 2px 4px;",
        setup(self) {
            const popupsList = new Map()
            const onNotify = (_: unknown, id: number) => {
                const notif = Notifications.getNotification(id)
                if (!notif || Notifications.dnd) return

                let first = false
                const replace = popupsList.get(id)
                if (replace) {
                    const keys = Array.from(popupsList.keys())
                    if (keys[keys.length - 1] === id) first = true
                    replace.attribute.destroy(first)
                }

                // convert the notification
                const popup = Popup(notif, true, first)
                self.children = [popup, ...self.children]
                popupsList.set(id, popup)

                const keys = Array.from(popupsList.keys())
                if (keys.length > 5) {
                    Notifications.getNotification(keys[0])?.dismiss()
                }
            }

            const onDismiss = (_: unknown, id: number) => {
                // If notification is not in popup list exit
                if (!popupsList.get(id)) return

                // If notification is there then renmove it from the list and close the notification
                popupsList.get(id).attribute.destroy()
                popupsList.delete(id)
            }

            self.hook(Notifications, onNotify, "notified")
            self.hook(Notifications, onDismiss, "dismissed")
            self.hook(Notifications, onDismiss, "closed")
        },
    })

export default () =>
    Widget.Window({
        name: "popups",
        anchor: ["top", "right"],
        layer: "overlay",
        keymode: "on-demand",
        child: NotificationPopupsWidget(),
        css: "background: none",
    })
