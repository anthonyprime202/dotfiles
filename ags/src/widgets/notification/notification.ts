import Config from "src/lib/config"
import Icons from "src/lib/icons"
import GLib from "types/@girs/glib-2.0/glib-2.0"
import { Notification as NotificationType } from "types/service/notifications"

const getImage = (notification: NotificationType) => {
    let icon: string
    if (notification.image) {
        return Widget.Box({
            hpack: "center",
            vpack: "start",
            className: "notification-popup-image",
            css: `
                background-image: url("${notification.image}");
                background-size: cover;
                background-repeat: no-repeat;
            `,
        })
    } else if (Utils.lookUpIcon(notification.app_icon))
        icon = notification.app_icon
    else icon = Icons.notification.fallback
    return Widget.Icon({ className: "notification-popup-image", icon: icon })
}

const Notification = (notification: NotificationType, popup: boolean) =>
    Widget.EventBox({
        setup(self) {
            // For holding the entire notification
            const container = Widget.Box({
                className: "notification-popup-container",
                vertical: true,
            })
            self.add(container)
            // Check if it's a popup and the relevant urgency and popup class
            container.toggleClassName(
                `notification-popup-${notification.urgency}-urgency`,
                popup,
            )
            container.toggleClassName("notification-popups-popup", popup)

            // For holding the entire upper portion of the notification
            const content = Widget.Box({
                className: "notification-popup-details-container",
                spacing: 10,
                vexpand: true,
                hexpand: true,
            })
            container.add(content)

            // Add the image if there's a image to the notification
            content.add(getImage(notification))
            const summary = Widget.Label({
                hpack: "start",
                className: "notification-popup-summary",
                maxWidthChars: 18,
                truncate: "end",

                label: notification.summary,
            })
            const time = Widget.Label({
                className: "notification-popup-time",
                label: GLib.DateTime.new_from_unix_local(
                    notification.time,
                ).format("%I:%M %p"),
            })
            const close = Widget.Button({
                className: "notification-popup-close-button",
                child: Widget.Icon(Icons.close),
                onClicked: () => notification.close(),
            })

            const body = Widget.Label({
                className: "notification-popup-body",
                label: notification.body
                    // HACK: remove linebreaks, so lines property works properly
                    .replace(/(\r\n|\n|\r)/gm, " "),
                maxWidthChars: 30,
                hpack: "start",
                hexpand: true,
                wrap: true,
                use_markup: true,
                lines: 3,
                truncate: "end",
                selectable: true,
            })

            content.add(
                Widget.Box({
                    hexpand: true,
                    vexpand: true,
                    vertical: true,
                    children: [
                        Widget.CenterBox({
                            vpack: "center",
                            startWidget: summary,
                            endWidget: Widget.Box({
                                hpack: "end",
                                spacing: 2,
                                children: [time, close],
                            }),
                        }),
                        body,
                    ],
                }),
            )

            if (!notification.actions.length) return
            const actions = Widget.Revealer({
                transition: "slide_down",
                transitionDuration: Config.animation.baseAnimation,
                child: Widget.Box({
                    className: "notification-popup-actions-container",
                    hexpand: true,
                    children: notification.actions.map((action) =>
                        Widget.Button({
                            hpack: "fill",
                            hexpand: true,
                            label: action.label,
                            onClicked: () => notification.invoke(action.id),
                        }),
                    ),
                }),
            })
            container.add(actions)

            self.on_hover = () => {
                if (actions) actions.reveal_child = true
            }
            self.on_hover_lost = () => {
                if (actions) actions.reveal_child = false
            }
        },
    })

export default (
    notification: NotificationType,
    popup: boolean,
    firstReplace: boolean,
) => {
    const leftSlideRevealer = Widget.Revealer({
        transitionDuration: Config.animation.popup.left,
        transition: "slide_left",
        child: Notification(notification, popup),
        revealChild: firstReplace || !popup,
        setup(self) {
            Utils.timeout(Config.animation.popup.down + 1, () => {
                self.reveal_child = true
            })
        },
    })

    const downSlideRevealer = Widget.Revealer({
        transition: "slide_down",
        transitionDuration: Config.animation.popup.down,
        css: "background: red",
        revealChild: firstReplace,
        child: leftSlideRevealer,
        setup(self) {
            Utils.timeout(1, () => {
                self.reveal_child = true
            })
        },
    })

    return Widget.Box({
        child: downSlideRevealer,
        hpack: "end",
        vpack: "center",
        setup(self) {
            self.attribute = {
                destroy(first: boolean, panel: boolean = false) {
                    if (first) {
                        self.destroy()
                        return
                    }
                    if (panel) {
                        downSlideRevealer.reveal_child = false
                        Utils.timeout(Config.animation.popup.down, () => {
                            self.destroy()
                        })
                        return
                    }
                    leftSlideRevealer.reveal_child = false
                    Utils.timeout(Config.animation.popup.left, () => {
                        downSlideRevealer.reveal_child = false
                        Utils.timeout(Config.animation.popup.down, () => {
                            self.destroy()
                        })
                    })
                },
            }
        },
    })
}
