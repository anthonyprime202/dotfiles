import icons from "assets/icons"

const Battery = await Service.import('battery')

export default () => Widget.Box({
    children: [
        Widget.Label({
            label: Battery.bind('percent').as(p => `${p}%`)
        }),
        Widget.CircularProgress({
            child: Widget.Icon().bind('icon', Battery, 'charging', (charging) => charging ? icons.battery.charging : icons.battery.normal),

            startAt: 0.75,
            rounded: true,
            value: Battery.bind('percent').as(percent => percent > 0 ? percent / 100 : 0)
        })
    ],

    setup: self => {
        self.hook(Battery, () => {
            self.toggleClassName('charging', Battery.charging)

            self.toggleClassName('critical', Battery.percent < 30)
            self.toggleClassName('normal', 30 <= Battery.percent && Battery.percent < 70)
            self.toggleClassName('full', 70 <= Battery.percent)
        })
    }

})
