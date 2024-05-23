import type Competition from '../../../lib/competitions/competition.interface'

export default interface CompetitionProps {
    data?: Competition
    className?: string
    testIds?: {
        root?: string
    }
    displayVariant?: 'card' | 'preview'
    onPress?: React.EventHandler<React.SyntheticEvent>
}
