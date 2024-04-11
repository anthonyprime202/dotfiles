import Settings from "src/settings"

const SystemTray = await Service.import('systemtray')

export default () => Widget.Box({
    setup: box => {
        const sysTray = Widget.Box({
            children: SystemTray.bind('items').as(items => items.map(item => Widget.Button({
                child: Widget.Icon().bind('icon', item, 'icon'),
                tooltipMarkup: item.bind('tooltip_markup'),
                cursor: 'pointer',
                onPrimaryClick: (_, event) => item.activate(event),
                onSecondaryClick: (_, event) => item.openMenu(event),
            })))
        })

        const sysTrayRevealer = Widget.Revealer({
            transition: 'slide_left',
            child: sysTray,
            transitionDuration: Settings.baseAnimationDuration,
        })

        const panButton = Widget.Button({
            setup: self => {

                const icon = Widget.Icon('pan-start-symbolic')
                self.on_primary_click = () => {
                    sysTrayRevealer.reveal_child = !sysTrayRevealer.reveal_child
                    icon.icon = sysTrayRevealer.reveal_child ? 'pan-end-symbolic' : 'pan-start-symbolic'
                }
                self.add(icon)
            }
        })

        box.children = [panButton, sysTrayRevealer];
    }
})
