import type { FunctionComponent } from 'react'

import PrimaryGeneral from './primary.general'
import PrimaryPrint from './primary.print'
import PrimaryAsync from './primary.submit'
import type PrimaryProps from './primary-props.interface'

const Primary: FunctionComponent<PrimaryProps> = ({
    variant,
    ...props
}: PrimaryProps): JSX.Element => {
    switch (variant) {
        case 'general':
            return <PrimaryGeneral {...props} />
        case 'async':
            return <PrimaryAsync {...props} />
        case 'print':
            return <PrimaryPrint {...props} />
        default:
            return <></>
    }
}

Primary.displayName = 'Button:Primary'

export default Primary
