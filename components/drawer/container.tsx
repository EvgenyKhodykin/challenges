import type { FunctionComponent } from 'react'

import ContainerProfile from './container.profile'
import type ContainerProps from './container-props.interface'

const Drawer: FunctionComponent<ContainerProps> = ({
    variant,
    ...props
}: ContainerProps): JSX.Element => {
    switch (variant) {
        case 'profile':
            return <ContainerProfile {...props} />
        default:
            return <></>
    }
}

Drawer.displayName = 'Drawer:Container'

export default Drawer
