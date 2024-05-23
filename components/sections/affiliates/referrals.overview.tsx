/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import AffiliateCommission from 'lib/affiliates/affiliate-commission.interface'
import { TIMES } from 'lib/affiliates/affiliates.const'
import { filterCommissionsByTimeInterval as filterCommissions } from 'lib/utils/time'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import IconPeople from '../../icons/people.closed'
import Paper from '../../surfaces/paper'
import styles from './referrals.overview.module.scss'

export interface Props {
    value: number
    commissions: Array<AffiliateCommission>
    timeInterval: TIMES
    className?: string
}

const Component: React.FC<Props> = ({
    value,
    commissions,
    timeInterval,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('affiliates')
    const filteredCommissions = filterCommissions(commissions, timeInterval)

    const purchases = useMemo(() => {
        if (!filteredCommissions.length) return 0
        return filteredCommissions.filter((item) => item.orderStatus === 'completed')
            .length
    }, [filteredCommissions])

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconPeople className={styles.Chart} />
                    </span>
                    <span className={styles.Text}>{t('board.referrals.title')}</span>
                </div>
                {/* <span className={styles.Percent}>
                    {t('board.referrals.conversionRate')} <span>50</span>
                    <sup>%</sup>
                </span> */}
            </div>
            <div className={styles.Middle}>
                {value > 0 ? value : <span>&mdash;</span>}
            </div>
            <div className={styles.Bottom}>
                {/* <span className={styles.Visits}>
                    {t('board.referrals.visits')} <span>20</span>
                </span> */}
                {value > 0 && (
                    <span className={styles.Purchases}>
                        {t('board.referrals.purchases')} <span>{purchases}</span>
                    </span>
                )}
            </div>
        </Paper>
    )
}

Component.displayName = 'Sections:Affiliates:Referrals.overview'

export default Component
