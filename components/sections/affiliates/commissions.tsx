/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import AffiliateCommission from 'lib/affiliates/affiliate-commission.interface'
import { TIMES } from 'lib/affiliates/affiliates.const'
import { filterCommissionsByTimeInterval as filterCommissions } from 'lib/utils/time'
import sumBy from 'lodash/sumBy'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import Amount from '../../amount/amount'
import IconCommission from '../../icons/commission'
import Paper from '../../surfaces/paper'
import styles from './commissions.module.scss'

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
    const mockApi = process.env.NEXT_PUBLIC_API_MOCK === 'true'
    const filteredCommissions = filterCommissions(commissions, timeInterval)

    const sales = useMemo(() => {
        if (!filteredCommissions.length || mockApi) return 0
        return Math.trunc(sumBy(filteredCommissions, 'saleAmount'))
    }, [filteredCommissions])

    const discount = useMemo(() => {
        if (!filteredCommissions.length || mockApi) return 0
        return Math.trunc(sumBy(filteredCommissions, 'discountAmount'))
    }, [filteredCommissions])

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconCommission className={styles.Chart} />
                    </span>
                    <span className={styles.Text}>{t('board.commissions.title')}</span>
                </div>
                {/* <span className={styles.Percent}>
                    {t('board.commissions.rate')} <span>20</span>
                    <sup>%</sup>
                </span> */}
            </div>
            <div className={styles.Middle}>
                <Amount
                    className={styles.Amount}
                    amount={value}
                    currency={'USD'}
                    position={'append'}
                    superscript
                    zeroAmount='&mdash;'
                />
            </div>
            <div className={styles.Bottom}>
                {value > 0 && (
                    <span className={styles.Sales}>
                        {t('board.commissions.sales')}{' '}
                        <Amount
                            className={styles.Amount}
                            amount={sales}
                            currency={'USD'}
                            position={'append'}
                            superscript
                            zeroAmount={'0'}
                        />
                    </span>
                )}
                {value > 0 && (
                    <span className={styles.Discount}>
                        {t('board.commissions.discount')}{' '}
                        <Amount
                            className={styles.Amount}
                            amount={discount}
                            currency={'USD'}
                            position={'append'}
                            superscript
                            zeroAmount='0'
                        />
                    </span>
                )}
            </div>
        </Paper>
    )
}

Component.displayName = 'Sections:Affiliates:Commissions'

export default Component
