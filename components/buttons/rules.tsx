import RulesDetails from './rules.details'
import type RulesProps from './rules-props.interface'

export type Variant = 'card' | 'details'

export interface Props extends RulesProps {
    variant: Variant
}

const Rules: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'details':
            return <RulesDetails {...props} />
        default:
            return <></>
    }
}

Rules.displayName = 'Buttons:Rules'

export default Rules
