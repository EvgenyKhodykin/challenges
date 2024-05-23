import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import type Account from '../../../lib/accounts/account.interface'
import { PASSING_STATUS } from '../../../lib/api/challenges/challenges.const'
import Amount from '../../amount/amount'
import type { DAY } from '../../icons/calendar'
import IconCalendar from '../../icons/calendar'
import IconCalendarArrowDown from '../../icons/calendar.arrow-down'
import IconChartArrowDown from '../../icons/chart.arrow-down'
import IconChartArrowUp from '../../icons/chart.arrow-up'
import styles from './body.failed.module.scss'

export interface Props {
    className?: string
    data: Account
}

const Component: React.FC<Props> = ({ className, data }: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')
    const toGoal = useMemo(() => {
        const { value, status } = data.targetLeftToEarn

        if (status !== PASSING_STATUS.FAILED) {
            return <></>
        }

        return (
            <div className={styles.Row}>
                <IconChartArrowUp className={styles.Icon} />
                <span className={styles.Message}>
                    <Amount
                        amount={value.amount}
                        currency={value.currency}
                        position={'prepend'}
                        format={'symbol'}
                        className={styles.Amount}
                    />
                    &nbsp;{t('challengeTiles.failed.profitNotReached')}
                </span>
            </div>
        )
    }, [data, t])

    const tradingDays = useMemo(() => {
        const { value, status, min } = data.tradingDays

        if (status !== PASSING_STATUS.FAILED) {
            return <></>
        }

        return (
            <div className={styles.Row}>
                <IconCalendar day={min as DAY} className={styles.Icon} />
                <span className={styles.Message}>
                    {t('challengeTiles.goals.tradingDays', { count: value })}
                </span>
            </div>
        )
    }, [data, t])

    const todayLoss = useMemo(() => {
        const { value, status } = data.todayPermittedLoss

        if (status !== PASSING_STATUS.FAILED) {
            return <></>
        }

        return (
            <div className={styles.Row}>
                <IconCalendarArrowDown className={styles.Icon} />
                <span className={styles.Message}>
                    <Amount
                        amount={value.amount}
                        currency={value.currency}
                        position={'prepend'}
                        format={'symbol'}
                        className={styles.Amount}
                    />
                    &nbsp;{t('challengeTiles.failed.todayLossExceeded')}
                </span>
            </div>
        )
    }, [data, t])

    const maxLoss = useMemo(() => {
        const { value, status } = data.maxPermittedLoss

        if (status !== PASSING_STATUS.FAILED) {
            return <></>
        }

        return (
            <div className={styles.Row}>
                <IconChartArrowDown className={styles.Icon} />
                <span className={styles.Message}>
                    <Amount
                        amount={value.amount}
                        currency={value.currency}
                        position={'prepend'}
                        format={'symbol'}
                        className={styles.Amount}
                    />
                    &nbsp;{t('challengeTiles.failed.maxLossExcceded')}
                </span>
            </div>
        )
    }, [data, t])
    return (
        <div className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                {toGoal}
                {tradingDays}
                {todayLoss}
                {maxLoss}
            </div>
        </div>
    )
}

Component.displayName = 'Modal:Dashboard:Body.failed'

export default Component
