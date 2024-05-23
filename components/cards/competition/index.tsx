import isNil from 'lodash/isNil'

import CompetitionActive from './competition.active'
import CompetitionClosed from './competition.closed'
import CompetitionsUpcoming from './competition.upcoming'
import type CompetitionProps from './competition-props.interface'

export type Variant = 'active' | 'closed' | 'upcoming'

export interface Props extends CompetitionProps {
    variant?: Variant
}

const Competition: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    if (isNil(props.data)) {
        return <></>
    }
    switch (variant) {
        case 'upcoming':
            return <CompetitionsUpcoming {...props} />
        case 'active':
            return <CompetitionActive {...props} />
        case 'closed':
            return <CompetitionClosed {...props} />
        default:
            return <></>
    }
}

Competition.displayName = 'Cards:Competition'

export default Competition
