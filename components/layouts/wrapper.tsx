import type { FunctionComponent } from 'react'

import WrapperPrivate from './wrapper.private'
import WrapperPublic from './wrapper.public'
import type WrapperProps from './wrapper-props.interface'

const Wrapper: FunctionComponent<WrapperProps> = ({
    variant,
    ...props
}: WrapperProps): JSX.Element => {
    switch (variant) {
        case 'private':
            return <WrapperPrivate {...props} />
        case 'public':
            return <WrapperPublic {...props} />
        default:
            return <></>
    }
}

Wrapper.displayName = 'Layout:Wrapper'

export default Wrapper
