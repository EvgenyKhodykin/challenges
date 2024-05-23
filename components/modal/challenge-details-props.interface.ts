import State from 'lib/pages/challenge-details/state.interface'

import type { ChallengeDetailsTestIds as TestId } from './challenge-details-test-ids.interface'
import type { Props as ModalGeneralProps } from './modal.general'

export default interface ChallengeDetailsProps extends ModalGeneralProps {
    testIds?: TestId
    state: State
    handleHide: () => void
}
