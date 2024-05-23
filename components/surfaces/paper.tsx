import type { FunctionComponent } from 'react'

import PaperGeneral from './paper.general'
import type PaperProps from './paper-props.interface'

const Paper: FunctionComponent<PaperProps> = ({
    variant,
    ...props
}: PaperProps): JSX.Element => {
    switch (variant) {
        case 'general':
        default:
            return <PaperGeneral {...props} />
    }
}

Paper.displayName = 'Surface:Paper'

export default Paper
