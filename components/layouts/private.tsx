import type { FunctionComponent } from 'react'

import PrivateWithSidebar from './private.with-sidebar'
import PrivateWithoutSidebar from './private.without-sidebar'
import type PrivateProps from './private-props.interface'

const Private: FunctionComponent<PrivateProps> = ({
    variant,
    ...props
}: PrivateProps): JSX.Element => {
    switch (variant) {
        case 'with-sidebar':
            return <PrivateWithSidebar {...props} />
        case 'without-sidebar':
            return <PrivateWithoutSidebar {...props} />
        default:
            return <></>
    }
}

Private.displayName = 'Layout:Private'

export default Private
