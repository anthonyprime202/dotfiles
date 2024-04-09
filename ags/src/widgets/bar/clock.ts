export default () => Widget.Label({
    setup: self => {
        self.poll(1000, async () => await Utils.execAsync(["date", "+%a, %d %b, %I:%M %p"]).then(date => self.label = date).catch(printerr))
    }
})
