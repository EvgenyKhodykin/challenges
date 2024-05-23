import { isNil } from 'lodash'

import PreviewFailed from '../dashboard/failed.tile'
import PreviewNew from '../dashboard/new'
import PreviewOngoing from '../dashboard/ongoing.tile'
import PreviewPassed from '../dashboard/passed.tile'
import DashboardProps from '../dashboard/props.interface'

export enum Variant {
    PREVIEW_NEW,
    PREVIEW_ONGOING,
    PREVIEW_PASSED,
    PREVIEW_FAILED,
    PREVIEW_CREATED,
}

export interface Props extends DashboardProps {
    variant: Variant
}

const Component: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    if (![Variant.PREVIEW_NEW].includes(variant) && isNil(props.data)) {
        return <></>
    }

    switch (variant) {
        case Variant.PREVIEW_NEW:
            return <PreviewNew {...props} />
        case Variant.PREVIEW_ONGOING:
            return <PreviewOngoing {...props} />
        case Variant.PREVIEW_PASSED:
            return <PreviewPassed {...props} />
        case Variant.PREVIEW_FAILED:
            return <PreviewFailed {...props} />
        default:
            return <></>
    }
}

Component.displayName = 'Cards:ChallengeDetails'

export default Component
