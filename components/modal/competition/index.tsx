import isNil from 'lodash/isNil'

import { COMPETITION_STATUS } from '../../../lib/competitions/competitions.const'
import type Props from '../../modal/competition/rules-props.interface'
import RulesActive from './rules.active'
import RulesClosed from './rules.closed'
import RulesUpcoming from './rules.upcoming'

const Rules: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    if (isNil(props.data)) {
        return <></>
    }
    switch (variant) {
        case COMPETITION_STATUS.UPCOMING:
            return <RulesUpcoming {...props} />
        case COMPETITION_STATUS.ACTIVE:
            return <RulesActive {...props} />
        case COMPETITION_STATUS.CLOSED:
            return <RulesClosed {...props} />
        default:
            return <></>
    }
}

Rules.displayName = 'Modal:Competition:Rules'

export default Rules
