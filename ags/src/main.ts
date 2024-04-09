import Bar from './widgets/bar/main'

const scss = App.configDir + '/src/styles/main.scss';
const css = '/tmp/ags/styles.css'

Utils.monitorFile(App.configDir + '/src/styles', async () => {
    await Utils.execAsync(`scss ${scss} ${css}`)

    App.resetCss()
    App.applyCss(css)
})

App.config({
    style: css,
    windows: [Bar(0)],
    closeWindowDelay: {},
})
