import type { FunctionComponent } from 'react'

import type InputProps from './input-props.interface'
import TextEnter from './text.enter'

export interface Props extends InputProps {
    variant?: 'enter'
}

const Text: FunctionComponent<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'enter':
        default:
            return <TextEnter {...props} />
    }
}

Text.displayName = 'Input:Text'

export default Text
