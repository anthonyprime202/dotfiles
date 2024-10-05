const Notification = await Service.import("notifications")
Notification.popupTimeout = 10000
Notification.forceTimeout = false

export default {
    workspaceCount: 10,
    maxPopups: 5,
    powerMenu: ["lock", "logout", "suspend", "restart", "shutdown"],

    animation: {
        baseAnimation: 500,
        player: 500,
        systemTray: 500,
        widgets: 500,
        popup: {
            actions: 200,
            down: 150,
            left: 200,
        },
    },

    commands: {
        clock: "date '+%a, %d %b %I:%M %p'",
        colorPicker: "sh -c 'hyprpicker | wl-copy'",
        inhibit: {
            on: "wlinhibit",
            off: "pkill wlinhibit",
        },
        power: {
            shutdown: "systemctl poweroff",
            restart: "systemctl reboot",
            suspend: "systemctl suspend",
            logout: "hyprctl dispatch exit",
            lock: "loginctl lock-session",
        },
    },
}
