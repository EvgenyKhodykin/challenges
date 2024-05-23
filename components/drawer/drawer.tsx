import DrawerProfile from './drawer.layout.profile'
import type DrawerProps from './drawer-props.interface'

export type Variant = 'profile'

export interface Props extends DrawerProps {
    variant: Variant
}

const Drawer: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'profile':
            return <DrawerProfile {...props} />
        default:
            return <></>
    }
}

Drawer.displayName = 'Drawer'

export default Drawer
