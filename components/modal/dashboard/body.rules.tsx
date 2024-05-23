import IconCheck from '@mui/icons-material/CheckRounded'
import IconCross from '@mui/icons-material/CloseRounded'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo } from 'react'

import type Account from '../../../lib/accounts/account.interface'
import { PASSING_STATUS } from '../../../lib/api/challenges/challenges.const'
import Amount from '../../amount/amount'
import type { DAY } from '../../icons/calendar'
import IconCalendar from '../../icons/calendar'
import IconCalendarArrowDown from '../../icons/calendar.arrow-down'
import IconChartArrowDown from '../../icons/chart.arrow-down'
import IconChartArrowUp from '../../icons/chart.arrow-up'
import styles from './body.rules.module.scss'

export interface Props {
    data: Account
    className?: string
}

const Component: React.FC<Props> = ({ className, data }: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')
    const marker = useCallback((status: PASSING_STATUS, negative = true) => {
        if (PASSING_STATUS.PASSED === status) {
            return <IconCheck className={styles.IconCheck} />
        } else if (PASSING_STATUS.FAILED === status && negative) {
            return <IconCross className={styles.IconCross} />
        }
        return <></>
    }, [])

    const toGoal = useMemo(() => {
        const { value, status } = data.targetLeftToEarn
        return (
            <span className={styles.Row}>
                <IconChartArrowUp className={styles.IconLabel} />
                <span className={styles.Value}>
                    <Amount
                        amount={value.amount}
                        currency={value.currency}
                        position={'prepend'}
                        format={'symbol'}
                        className={styles.Amount}
                    />
                    &nbsp;{t('challengeTiles.goals.toTheGoal')}
                </span>
                {marker(status, false)}
            </span>
        )
    }, [data.targetLeftToEarn, marker, t])

    const tradingDays = useMemo(() => {
        const { value, min, status } = data.tradingDays
        const difference = min - value

        let message = t('challengeTiles.goals.tradingDays', {
            count: value,
        })
        if (difference > 0) {
            message = t('challengeTiles.goals.tradingDaysToTheGoal', {
                count: difference,
            })
        }
        return (
            <span className={styles.Row}>
                <IconCalendar className={styles.IconLabel} day={min as DAY} />
                <span className={styles.Value}>{message}</span>
                {marker(status, false)}
            </span>
        )
    }, [data.tradingDays, marker, t])

    const todayLoss = useMemo(() => {
        const { value, status } = data.todayPermittedLoss

        return (
            <span className={styles.Row}>
                <IconCalendarArrowDown className={styles.IconLabel} />
                <span className={styles.Value}>
                    <Amount
                        amount={value.amount}
                        currency={value.currency}
                        position={'prepend'}
                        format={'symbol'}
                        className={styles.Amount}
                    />
                    &nbsp;{t('challengeTiles.restrictions.todayLoss')}
                </span>
                {marker(status)}
            </span>
        )
    }, [data.todayPermittedLoss, marker, t])

    const maxLoss = useMemo(() => {
        const { value, status } = data.maxPermittedLoss

        return (
            <span className={styles.Row}>
                <IconChartArrowDown className={styles.IconLabel} />
                <span className={styles.Value}>
                    <Amount
                        amount={value.amount}
                        currency={value.currency}
                        position={'prepend'}
                        format={'symbol'}
                        className={styles.Amount}
                    />
                    &nbsp;{t('challengeTiles.restrictions.maxLoss')}
                </span>
                {marker(status)}
            </span>
        )
    }, [data.maxPermittedLoss, marker, t])

    return (
        <div className={classNames(styles.Root, className)}>
            <div className={styles.Section}>
                <span className={styles.Title}>{t('challengeTiles.goals.title')}</span>
                {toGoal}
                {tradingDays}
            </div>
            <div className={styles.Section}>
                <span className={styles.Title}>
                    {t('challengeTiles.restrictions.title')}
                </span>
                {todayLoss}
                {maxLoss}
            </div>
        </div>
    )
}

export default Component
