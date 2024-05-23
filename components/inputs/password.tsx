import type { FunctionComponent } from 'react'

import type InputProps from './input-props.interface'
import PasswordEnter from './password.enter'
import PasswordNew from './password.new'

export interface Props extends InputProps {
    variant?: 'enter' | 'new' | 'confirm'
}

const Password: FunctionComponent<Props> = ({
    variant,
    ...props
}: Props): JSX.Element => {
    switch (variant) {
        case 'new':
            return <PasswordNew {...props} />
        case 'enter':
        default:
            return <PasswordEnter {...props} />
    }
}

Password.displayName = 'Input:Password'

export default Password
