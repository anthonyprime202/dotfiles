import icons from 'assets/icons';

export const MenuButton = () => Widget.Button({
    cursor: 'pointer',
    child: Widget.Icon(icons.archLogo),
})

export const PowerButton = () => Widget.Button({
    cursor: 'pointer',
    child: Widget.Icon(icons.power.poweroff)
})

