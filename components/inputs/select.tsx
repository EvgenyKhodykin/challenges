import SelectGeneral from './select.general'
import type SelectProps from './select-props.interface'

export interface Props extends SelectProps {
    variant?: 'general'
}

const Select: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'general':
        default:
            return <SelectGeneral {...props} />
    }
}

export default Select
