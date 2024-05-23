import { CompetitionPrize } from '../../lib/competitions/competition.interface'
export default interface CompetitionPrizeProps {
    prizes?: CompetitionPrize
    place?: number
    className?: string
    testIds?: {
        root?: string
    }
}
