import Config from "src/lib/config"
import Icons from "src/lib/icons"

const SystemTray = await Service.import("systemtray")

const SysTrayWidget = () =>
    Widget.Revealer({
        transition: "slide_right",
        transitionDuration: Config.animation.systemTray,
        revealChild: false,
        child: Widget.Box({
            children: SystemTray.bind("items").transform((items) => {
                return items.map((item) => {
                    return Widget.Button({
                        className: "bar-systray-item",
                        child: Widget.Icon().bind("icon", item, "icon"),
                        cursor: "pointer",
                        // @ts-ignore
                        tooltipMarkup: item.bind("tooltip-markup"),
                        onPrimaryClick: (_, event) => item.activate(event),
                        onSecondaryClick: (_, event) => item.openMenu(event),
                    })
                })
            }),
        }),
    })

const getIcon = (reveal: boolean) => (reveal ? Icons.pan.right : Icons.pan.left)

export default () =>
    Widget.EventBox({
        hpack: "center",
        vpack: "center",
        setup: (self) => {
            const systray = SysTrayWidget()
            const holder = Widget.Button({
                child: Widget.Icon(getIcon(systray.reveal_child)),
                cursor: "pointer",
            })
            self.child.add(holder)
            self.child.add(systray)
            holder.on_primary_click = () => {
                systray.reveal_child = !systray.reveal_child
                holder.child.icon = getIcon(systray.reveal_child)
            }
        },
        child: Widget.Box({
            className: "bar-systray-widget",
        }),
    })
