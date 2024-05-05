import Uptime from "./uptime"


const DashBoardWindow = () => Widget.Box({
    hpack: 'center',
    vpack: 'center',
    vertical: true,
    css: 'min-width: 1500px;min-height: 850px;background: transparent',
    children: [
        Widget.Box({
            vertical: true,
            children: [
                Widget.Box({
                    vertical: true,
                    children: [
                        Widget.Box({
                            children: [
                                // Avatar and Uptime
                                Uptime(),
                                // Media Player
                                Widget.Box({
                                    child: Widget.Label('Media Player')
                                })
                            ]
                        }),
                        // Brightness Bar
                        Widget.Box({
                            child: Widget.Label('Brightness Bar')
                        }),
                        // Audio Mixer
                        Widget.Box({
                            child: Widget.Label('Audio Mixer')
                        }),
                    ]
                }),
                Widget.Box({
                    vertical: true,
                    children: [
                        // Wifi and Bluetooth
                        Widget.Box({
                            child: Widget.Label('Wifi and Bluetooth')
                        }),
                        // Power Profiles
                        Widget.Box({
                            child: Widget.Label('Power Profiles')
                        })

                    ]
                })
            ]
        }),
        Widget.Box({
            children: [
                // System Info
                Widget.Box({

                }),
                // Notification List
                Widget.Box({

                })
            ]
        })
    ]
})

export default () => Widget.Window({
    name: 'dashboard',
    anchor: ['top', 'right', 'bottom', 'left'],
    child: DashBoardWindow(),
    visible: false,
    css: 'background: transparent',
    layer: 'overlay',
    exclusivity: 'exclusive',
})
