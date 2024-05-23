/* eslint-disable react-hooks/exhaustive-deps */
import Discount from '@mui/icons-material/Discount'
import classNames from 'classnames'

import styles from './coupon.module.scss'

export interface TestIds {
    root?: string
}

export interface Props {
    couponCode: string
    className?: string
    testIds?: TestIds
}

const Receipt: React.FC<Props> = ({
    couponCode,
    className,
    testIds,
}: Props): JSX.Element => (
    <span
        className={classNames(styles.Root, className)}
        data-testid={testIds?.root ?? 'coupon'}
    >
        <Discount className={styles.Icon} />
        <span className={styles.CouponCode}>{couponCode}</span>
    </span>
)

Receipt.displayName = 'Receipt'

export default Receipt
