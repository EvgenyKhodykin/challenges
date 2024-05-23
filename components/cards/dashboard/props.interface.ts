import type Account from '../../../lib/accounts/account.interface'
import { DASHBOARD_CARD_AMOUNT_DISPLAY } from '../../../lib/challenges/challenges.const'
import type { TestIds as ModalTestIds } from '../../modal/modal.credentials'
import type { TestIds as BodyTestIds } from './body.tile'
import type { TestIds as HeaderTestIds } from './header'

export default interface DashboardProps {
    data?: Account
    className?: string
    amountVariant?: DASHBOARD_CARD_AMOUNT_DISPLAY
    displayVariant?: 'card' | 'preview'
    testIds?: {
        root?: string
        header?: HeaderTestIds
        body?: BodyTestIds
        modal?: ModalTestIds
    }
    onPress?: React.EventHandler<React.SyntheticEvent>
}
