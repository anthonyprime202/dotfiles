import Bar from './widgets/bar/main'
import DashBoard from './widgets/dashboard/main'

const scss = App.configDir + '/src/styles/main.scss';
const css = '/tmp/ags/styles.css'

Utils.monitorFile(App.configDir + '/src/styles', async () => {
    await Utils.execAsync(`sassc ${scss} ${css}`)

    App.resetCss()
    App.applyCss(css)
})

await Utils.execAsync(`sassc ${scss} ${css}`)
App.config({
    style: css,
    windows: [Bar(0), DashBoard()],
    closeWindowDelay: {},
})
