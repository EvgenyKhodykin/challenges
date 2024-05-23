import classNames from 'classnames'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import Challenge from 'lib/challenges/challenge.interface'
import Price from 'lib/utils/price.interface'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo, useState } from 'react'

import Amount from '../amount/amount'
import ChartArea from '../graphs/live-equity.area'
import CalendarArrowDownIcon from '../icons/calendar.arrow-down'
import ChartDownIcon from '../icons/chart.arrow-down'
import ChartUpIcon from '../icons/chart.up'
import Toggle from '../inputs/toggle.general'
import Skeleton from '../skeletons/challenge-details/live-equity'
import Indicator from '../statuses/indicator'
import Paper from '../surfaces/paper'
import ChartSummary from '../tables/trading-history/summary'
import styles from './live-equity.module.scss'

export enum TABS {
    LINE = 'line',
    SUMMARY = 'summary',
}

export interface LiveEquityData {
    id: string
    remainingDailyLoss: Price
    overallLoss: Price
    account: Price
    balance: Price
    upper: Price
    trades: number
}

export interface Props {
    challenge: Challenge
    isLoading?: boolean
    className?: string
}

const Component: React.FC<Props> = ({
    challenge,
    className,
    isLoading,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const [tab, setTab] = useState<TABS>(TABS.LINE)
    const [highlight, cycleHighlight] = useCycle(false, true)

    const data = useMemo(
        (): LiveEquityData => ({
            id: challenge.id,
            remainingDailyLoss: {
                amount: challenge.todayPermittedLoss,
                currency: 'USD',
            },
            overallLoss: {
                amount: challenge.maxPermittedLimit,
                currency: 'USD',
            },
            account: challenge.account,
            balance: challenge.balance,
            upper: challenge.upper,
            trades: challenge.tradesLogs.total,
        }),
        [challenge]
    )

    const handleTabNavigation = useCallback(
        (value: string | Array<string>) => setTab(value as TABS),
        [setTab]
    )

    return (
        <Paper
            className={classNames(styles.Root, className, {
                [styles.Highlight]: highlight,
            })}
        >
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    <div className={styles.Top}>
                        <div className={styles.Title}>
                            <Indicator variant={'blinking'} type={'success'} />
                            <span className={styles.Text}>{t('liveEquity.title')}</span>
                        </div>
                        <Toggle
                            value={tab}
                            items={[
                                {
                                    key: TABS.LINE,
                                    element: <ChartUpIcon />,
                                },
                                {
                                    key: TABS.SUMMARY,
                                    element: <span>{t('liveEquity.filterLabel')}</span>,
                                },
                            ]}
                            handleToggle={handleTabNavigation}
                        />
                    </div>
                    <div className={styles.Middle}>
                        <AnimatePresence initial={false} mode='wait'>
                            {tab === TABS.LINE && (
                                <motion.div
                                    key={'line'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChartArea
                                        onUpdate={() => {
                                            cycleHighlight()
                                            setTimeout(cycleHighlight, 750)
                                        }}
                                        data={{ ...data }}
                                    />
                                </motion.div>
                            )}
                            {tab === TABS.SUMMARY && (
                                <motion.div
                                    key={'summary'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChartSummary
                                        challenge={challenge}
                                        variant='live'
                                        data={data}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className={styles.Bottom}>
                        <div className={styles.LossHighlights}>
                            <div className={styles.Left}>
                                <CalendarArrowDownIcon className={styles.Icon} />
                            </div>
                            <div className={styles.Right}>
                                <span className={styles.Label}>
                                    {t('liveEquity.dailyLoss')}
                                </span>
                                <Amount
                                    amount={data.remainingDailyLoss.amount}
                                    currency={data.remainingDailyLoss.currency}
                                    position={'append'}
                                    className={styles.Amount}
                                    superscript
                                />
                            </div>
                        </div>
                        <div className={styles.LossHighlights}>
                            <div className={styles.Left}>
                                <ChartDownIcon className={styles.Icon} />
                            </div>
                            <div className={styles.Right}>
                                <span className={styles.Label}>
                                    {t('liveEquity.overallLoss')}
                                </span>
                                <Amount
                                    amount={data.overallLoss.amount}
                                    currency={data.overallLoss.currency}
                                    position={'append'}
                                    className={styles.Amount}
                                    superscript
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Paper>
    )
}

Component.displayName = 'Graphs:Live'

export default Component
