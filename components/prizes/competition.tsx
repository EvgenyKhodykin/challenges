import PrizeLaurels from './competition.laurels'
import PrizeTop3 from './competition.top3'
import type CompetitionProps from './competition-props.interface'

export type Variant = 'laurels' | 'top3'

export interface Props extends CompetitionProps {
    variant?: Variant
}

const Competition: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'laurels':
            return <PrizeLaurels {...props} />
        case 'top3':
            return <PrizeTop3 {...props} />
        default:
            return <></>
    }
}

Competition.displayName = 'Prize:Competition'

export default Competition
