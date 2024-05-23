import type { FunctionComponent } from 'react'

import OutlinedDownload from './outlined.download'
import OutlinedGeneral from './outlined.general'
import OutlinedLink from './outlined.link'
import type OutlinedProps from './outlined-props.interface'

const Outlined: FunctionComponent<OutlinedProps> = ({
    variant,
    ...props
}: OutlinedProps): JSX.Element => {
    switch (variant) {
        case 'download':
            return <OutlinedDownload {...props} />
        case 'link':
            return <OutlinedLink {...props} />
        default:
            return <OutlinedGeneral {...props} />
    }
}

Outlined.displayName = 'Button:Outlined'

export default Outlined
