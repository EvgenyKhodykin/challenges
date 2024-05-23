import type Competition from '../../../lib/competitions/competition.interface'
import type { Props as ModalGeneralProps, TestIds } from '../modal.general'

export interface TestId extends TestIds {
    status?: string
    time?: string
}

export type Variant = 'active' | 'closed' | 'upcoming'

export default interface Props extends ModalGeneralProps {
    testIds?: TestId
    data: Competition | unknown
    showStandingsButton: boolean
    variant?: Variant
}
