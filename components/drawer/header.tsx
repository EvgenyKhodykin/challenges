import type { FunctionComponent } from 'react'

import HeaderProfile from './header.profile'
import HeaderProps from './header-props.interface'

const Header: FunctionComponent<HeaderProps> = ({
    variant,
    ...props
}: HeaderProps): JSX.Element => {
    switch (variant) {
        case 'profile':
            return <HeaderProfile {...props} />
        default:
            return <></>
    }
}

export default Header
