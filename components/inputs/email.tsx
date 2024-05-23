import type { FunctionComponent } from 'react'

import EmailEnter from './email.enter'
import Props from './email-props.interface'

const Email: FunctionComponent<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'enter':
        default:
            return <EmailEnter {...props} />
    }
}

Email.displayName = 'Input:Email'

export default Email
