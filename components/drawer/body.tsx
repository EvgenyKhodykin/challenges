import type { FunctionComponent } from 'react'

import BodyProfile from './body.profile'
import type BodyProps from './body-props.interface'

const Body: FunctionComponent<BodyProps> = ({
    variant,
    ...props
}: BodyProps): JSX.Element => {
    switch (variant) {
        case 'profile':
            return <BodyProfile {...props} />
        default:
            return <></>
    }
}

Body.displayName = 'Drawer:Body'

export default Body
