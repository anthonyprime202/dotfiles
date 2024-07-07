import { PowerButton, LauncherButton, ToolsTray } from "./buttons"
import WorkspaceWidget from "./workspace"
import PlayerWidget from "./player"
import Clock from "./clock"
import SystemTray from "./systemTray"
import Battery from "./battery"
import InfoWidget from "./info"

const BarWidget = () =>
    Widget.CenterBox({
        startWidget: Widget.Box({
            className: "bar-left-container",
            hpack: "start",
            children: [LauncherButton(), WorkspaceWidget(), PlayerWidget()],
        }),
        centerWidget: Widget.Box({
            className: "bar-center-container",
            hpack: "center",
            children: [Clock(), ToolsTray()],
        }),
        endWidget: Widget.Box({
            className: "bar-right-container",
            hpack: "end",
            children: [SystemTray(), InfoWidget(), Battery(), PowerButton()],
        }),
    })

export default (monitor: number) =>
    Widget.Window({
        monitor,
        name: `bar${monitor}`,
        className: "bar-window",
        exclusivity: "exclusive",
        layer: "top",
        keymode: "none",
        anchor: ["left", "top", "right"],
        child: BarWidget(),
        margins: [4, 0, 0, 0],
    })
