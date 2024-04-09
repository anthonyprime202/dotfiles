import { PowerButton, MenuButton } from "./buttons"
import Clock from './clock';
import Battery from "./battery";
import Workspaces from "./workspaces";

const BarWidget = () => Widget.CenterBox({
    startWidget: Widget.Box({
        hpack: 'start',
        children: [MenuButton(), Workspaces()]
    }),
    centerWidget: Widget.Box({
        hpack: 'center',
        children: [Clock()]
    }),
    endWidget: Widget.Box({
        hpack: 'end',
        children: [Battery(), PowerButton()]
    })
})


export default (monitor: number) => Widget.Window({
    name: `bar${monitor}`,
    layer: 'top',
    exclusivity: 'exclusive',
    anchor: ['top', 'right', 'left'],
    child: BarWidget()
})

