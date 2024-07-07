const entry = App.configDir + "/src/main.ts"
const outdir = "/tmp/ags/js"
const scss = `${App.configDir}/src/styles/main.scss`
const css = "/tmp/ags/style.css"

Utils.exec(`sass ${scss} ${css}`)
Utils.monitorFile(
    `${App.configDir}/src/styles`,

    function () {
        Utils.exec(`sass ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
)

try {
    await Utils.execAsync([
        "bun",
        "build",
        entry,
        "--outdir",
        outdir,
        "--external",
        "resource://*",
        "--external",
        "gi://*",
    ])
    await import(`file://${outdir}/main.js`)
} catch (error) {
    console.error(error)
}
