import isNil from 'lodash/isNil'

import ChangeDownIcon from '../icons/change-down'
import ChangeUpIcon from '../icons/change-up'
import NoChangeIcon from '../icons/no-change'

export interface Props {
    delta?: number
}

const RankChange: React.FC<Props> = ({ delta, ...props }: Props): JSX.Element => {
    if (isNil(delta) || delta === 0) {
        return <NoChangeIcon {...props} />
    }

    return delta > 0 ? <ChangeUpIcon {...props} /> : <ChangeDownIcon {...props} />
}

RankChange.displayName = 'Badge:RankChange'

export default RankChange
