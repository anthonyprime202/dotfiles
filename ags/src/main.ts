import Config from "./lib/config"
import Bar from "./widgets/bar/main"
import { PowerMenu, ConfirmWindow } from "./widgets/power/main"
import Popups from "./widgets/notification/popups"
import Panel from "./widgets/notification/panel"

App.config({
    style: "/tmp/ags/style.css",
    icons: `${App.configDir}/src/assets`,
    gtkTheme: "catppuccin-mocha-blue-standard+default",

    windows: [PowerMenu(), ConfirmWindow(), Bar(0), Popups(), Panel()],
    closeWindowDelay: {
        power: Config.animation.widgets,
        panel: Config.animation.widgets,
    },
})
