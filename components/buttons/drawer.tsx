import type { FunctionComponent } from 'react'

import DrawerProfile from './drawer.profile'
import type DrawerProps from './drawer-props.interface'

const Drawer: FunctionComponent<DrawerProps> = ({
    variant,
    ...props
}: DrawerProps): JSX.Element => {
    switch (variant) {
        case 'profile':
            return <DrawerProfile {...props} />
        default:
            return <></>
    }
}

Drawer.displayName = 'Button:Drawer'

export default Drawer
