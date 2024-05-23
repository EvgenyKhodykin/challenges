import CopyClipboard from './copy.clipboard'
import type CopyProps from './copy-props.interface'

export interface Props extends CopyProps {
    variant: 'clipboard'
}

const Copy: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'clipboard':
            return <CopyClipboard {...props} />
        default:
            return <></>
    }
}

Copy.displayName = 'Buttons:Copy'

export default Copy
