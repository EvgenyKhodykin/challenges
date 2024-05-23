import Leader from 'lib/leaders/leader.interface'

import { COMPETITION_STATUS } from '../../../lib/competitions/competitions.const'
export default interface CompetitionButtonProps {
    className?: string
    testIds?: {
        root?: string
    }
    participant?: Leader
    status: COMPETITION_STATUS
    id: number
    isDetailsPage?: boolean
    isRegistrationClosed?: boolean
}
