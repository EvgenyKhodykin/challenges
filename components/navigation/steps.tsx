import isEmpty from 'lodash/isEmpty'
import type { FunctionComponent } from 'react'

import type PublicFormsStep from '../../lib/navigation/public-forms-step.interface'
import StepsPublic from './steps.public'
import type StepsProps from './steps-props.interface'

const Steps: FunctionComponent<StepsProps<PublicFormsStep>> = ({
    variant,
    ...props
}: StepsProps<PublicFormsStep>): JSX.Element => {
    if (isEmpty(props.items)) {
        return <></>
    }
    switch (variant) {
        case 'public':
            return <StepsPublic {...props} />
        default:
            return <></>
    }
}

Steps.displayName = 'Navigation:Steps'

export default Steps
