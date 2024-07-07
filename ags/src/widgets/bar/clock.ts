import config from "src/lib/config"

export default () =>
    Widget.Label({
        className: "bar-clock-widget",
        setup: (self) =>
            self.poll(
                1000,
                async (self) =>
                    await Utils.execAsync(config.commands.clock)
                        .then((date) => (self.label = date))
                        .catch((e) => print(e)),
            ),
    })
