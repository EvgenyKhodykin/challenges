import type { FunctionComponent } from 'react'

import type MenuItem from '../../lib/navigation/menu-item.interface'
import Drawer from './menu.drawer'
import Footer from './menu.footer'
import Main from './menu.main'

export interface Props {
    items: Array<MenuItem>
    variant?: 'main' | 'footer' | 'drawer' | undefined
}

const Menu: FunctionComponent<Props> = ({ items, variant }: Props): JSX.Element => {
    switch (variant) {
        case 'footer':
            return <Footer items={items} />
        case 'drawer':
            return <Drawer items={items} />
        case 'main':
        default:
            return <Main items={items} />
    }
}

Menu.displayName = 'Menu'

export default Menu
