import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import { ORDER_STATUS } from '../../lib/orders/orders.const'
import styles from './status.purchase.module.scss'

export interface StatusPurchaseProps {
    className?: string
    status: ORDER_STATUS
}

const StatusPurchase: React.FC<StatusPurchaseProps> = ({
    className,
    status,
}: StatusPurchaseProps): JSX.Element => {
    const { t } = useTranslation('purchases-list')

    return (
        <span
            className={classNames(styles.Status, className, {
                [styles.Paid]: status === ORDER_STATUS.COMPLETED,
                [styles.Underpaid]: status === ORDER_STATUS.UNDERPAID,
                [styles.Failed]: status === ORDER_STATUS.ERROR,
                [styles.Expired]: status === ORDER_STATUS.EXPIRED,
            })}
        >
            {status === ORDER_STATUS.COMPLETED && t('purchase.paid.status')}
            {status === ORDER_STATUS.UNDERPAID && t('purchase.underpaid.status')}
            {status === ORDER_STATUS.ERROR && 'Failed Payment'}
            {status === ORDER_STATUS.EXPIRED && t('purchase.expired.status')}
        </span>
    )
}

StatusPurchase.displayName = 'Cards:StatusPurchase'

export default StatusPurchase
