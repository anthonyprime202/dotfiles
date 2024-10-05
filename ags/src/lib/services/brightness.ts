class BrightnessService extends Service {
    static {
        Service.register(
            this,
            {},
            {
                brightness: ["float", "rw"],
            },
        )
    }

    #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")

    #brightness = 0
    #max = Number(Utils.exec("brightnessctl max"))

    get brightness() {
        return this.#brightness
    }

    set brightness(percent) {
        if (percent < 0) percent = 0
        if (percent > 1) percent = 1
        this.#brightness = percent
    }

    constructor() {
        super()

        const brightnessFile = `/sys/class/backlight/${this.#interface}/brightness`
        Utils.monitorFile(brightnessFile, () => this.#onChange())

        this.#onChange()
    }

    #onChange() {
        this.#brightness = Number(Utils.exec("brightnessctl get")) / this.#max

        this.emit("changed") // emits "changed"
        this.notify("brightness") // emits "notify::screen-value"
    }
}

// the singleton instance
const service = new BrightnessService()

// export to use in other modules
export default service
