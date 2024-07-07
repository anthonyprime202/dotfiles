import Icons from "src/lib/icons"

const Battery = await Service.import("battery")

const BatteryProgress = () =>
    Widget.CircularProgress({
        className: "bar-battery-progress",
        rounded: true,
        startAt: 0.75,
        hpack: "center",
        vpack: "center",

        value: Battery.bind("percent").transform((p) => (p > 0 ? p / 100 : 0)),

        child: Widget.Icon({
            icon: Battery.bind("charging").transform((state) =>
                state ? Icons.battery.charging : Icons.battery.normal,
            ),
        }),
    })

export default () =>
    Widget.Box({
        className: "bar-battery-widget",
        hpack: "center",
        spacing: 7,
        vpack: "center",

        children: [
            BatteryProgress(),
            Widget.Label({
                className: "bar-battery-percent",
                label: Battery.bind("percent").transform((p) => `${p}%`),
            }),
        ],
        setup: (self) => {
            self.hook(Battery, () => {
                self.toggleClassName("bar-battery-charging", Battery.charging)
                self.toggleClassName(
                    "bar-battery-critical",
                    Battery.percent <= 30,
                )
                self.toggleClassName(
                    "bar-battery-warning",
                    Battery.percent <= 70 && Battery.percent > 30,
                )
                self.toggleClassName(
                    "bar-battery-good",
                    Battery.percent <= 100 && Battery.percent > 70,
                )
            })
        },
    })
