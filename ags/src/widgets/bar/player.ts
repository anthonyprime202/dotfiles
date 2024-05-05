const Mpris = await Service.import('mpris')

class Player extends Service {
    static {
        Service.register(
            this,
            {},
            { 'player': ['jsobject', 'r'], 'accent': ['string', 'r'], 'timestamp': ['int', 'r'], 'length': ['int', 'r'] }
        )
    }
}


export default () => Widget.Box({
    children: [
        Widget.CircularProgress({
            startAt: 0.75,
            rounded: true,
            setup: self => {
                self.poll(1000, () => {
                })
            }
        })
    ]
})
