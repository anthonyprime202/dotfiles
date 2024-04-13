import { BluetoothDevice } from "types/service/bluetooth"

const Bluetooth = await Service.import('bluetooth')
const Network = await Service.import('network')

const BluetoothDeviceItem = (device: BluetoothDevice) => Widget.Box({
    children: [
        Widget.Icon(device.icon_name),
        Widget.Label(device.name),
        Widget.Stack({
            hexpand: true,
            hpack: 'end',
            children: {
                toggle: Widget.Switch({
                    onActivate: ({ active }) => { if (active !== device.connected) { device.setConnection(active) } }
                }),
                spinner: Widget.Spinner()
            },
            setup: self => {
                self.hook(Bluetooth, () => {
                    if (device.connecting) {
                        self.shown = 'spinner'
                        if (!device.connected) {
                            self.children.toggle.active = false
                        }
                    } else {
                        self.shown = 'toggle'
                    }
                })
            }
        })
    ]
})

const BluetoothWidget = () => Widget.Box({
    vertical: true,
    children: [
        Widget.Box({
            children: [
                Widget.Label('Bluetooth'),
                Widget.Button({
                    hexpand: true,
                    hpack: 'end',
                    child: Widget.Icon('preferences-system-symbolic'),
                    onClicked: async () =>
                        await Utils.execAsync('blueman-manager').catch(printerr)
                }),
                Widget.Switch({
                    hpack: 'end',
                    onActivate: ({ active }) => { Bluetooth.enabled = active },
                    active: Bluetooth.bind('enabled'),
                })
            ]
        }),
        Widget.Box({
            vertical: true,
            children: Bluetooth.bind('devices').as(devs => devs.map(dev => BluetoothDeviceItem(dev)))
        })
    ]
})


const WifiMenu = () => Widget.Menu({
    icon: Network.wifi.bind('icon_name'),
    title: 'Wifi Selector'
})

const WidgetsBox = () => Widget.Box({
    vertical: true,
    children: [
        BluetoothWidget(),
    ]
})


export default () => Widget.Window({
    name: 'control-panel',
    anchor: ['left', 'top', 'bottom'],
    child: WidgetsBox(),
    exclusivity: 'exclusive',
})
