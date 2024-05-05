function uptime(timeStr: string): string {
    const raw = parseInt(timeStr.split('.')[0]) / 60
    const hour = Math.floor(raw / 60)
    const minute = Math.floor(raw % 60)
    return `${hour}h ${minute}m`

}


export default () => Widget.Box({
    children: [
        Widget.Box({
            css: `
                min-width: 70px;
                min-height: 70px;
                border-radius: 35px;
                background: url('/var/lib/AccountsService/icons/${Utils.USER}');
                background-size: cover;
                `
        }),

        Widget.Label({}).poll(1000, self => {
            self.label = uptime(Utils.exec('cat /proc/uptime'))
        })
    ]
})
