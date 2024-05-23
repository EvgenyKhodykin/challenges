import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Challenge from 'lib/challenges/challenge.interface'
import TradesLogItem from 'lib/challenges/trades-log-item.interface'
import CSVDataRow from 'lib/utils/csv-data-row.interface'
import Price from 'lib/utils/price.interface'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo, useState } from 'react'

import ChartTime from '../graphs/trading-history.time'
import ChartTrades from '../graphs/trading-history.trades'
import Toggle from '../inputs/toggle.general'
import Skeleton from '../skeletons/challenge-details/trades'
import Paper from '../surfaces/paper'
import TradingHistory from '../tables/trading-history'
import ChartSummary from '../tables/trading-history/summary'
import styles from './trading-history.module.scss'

export enum TABS {
    TRADES = 'TRADES',
    TIME = 'TIME',
    SUMMARY = 'SUMMARY',
    JOURNAL = 'JOURNAL',
}

export interface TraidingHistoryData {
    id: string
    lower: Price
    upper: Price
    balance: Price
    account: Price
    journalData: Array<TradesLogItem>
    journalTotal: number
    journalCSV: Array<CSVDataRow>
}

export interface Props {
    challenge: Challenge
    isLoading?: boolean
    className?: string
}

const Component: React.FC<Props> = ({
    challenge,
    isLoading,
    className,
}: Props): JSX.Element => {
    const [tab, setTab] = useState<TABS>(TABS.TRADES)
    const { t } = useTranslation('challenge-details')

    const data = useMemo(
        (): TraidingHistoryData => ({
            id: challenge.id,
            lower: challenge.lower,
            balance: challenge.balance,
            upper: challenge.upper,
            account: challenge.account,
            journalData: challenge.tradesLogs.data,
            journalTotal: challenge.tradesLogs.total,
            journalCSV: challenge.tradesLogs.csv,
        }),
        [challenge]
    )

    const handleTabNavigation = useCallback(
        (value: string | Array<string>) => setTab(value as TABS),
        [setTab]
    )

    return (
        <Paper className={classNames(className)}>
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    <div className={styles.Top}>
                        <span className={styles.Title}>{t('tradingHistory.title')}</span>
                        <div className={styles.Toggle}>
                            <Toggle
                                value={tab}
                                items={map(TABS, (value: string, key: string) => ({
                                    key,
                                    element: (
                                        <span>
                                            {t(`tradingHistory.filters.${value}`)}
                                        </span>
                                    ),
                                }))}
                                handleToggle={handleTabNavigation}
                            />
                        </div>
                    </div>
                    <div className={styles.Bottom}>
                        <AnimatePresence initial={false} mode='wait'>
                            {tab === TABS.TRADES && (
                                <motion.div
                                    key={'trades'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChartTrades data={{ ...data }} />
                                </motion.div>
                            )}
                            {tab === TABS.TIME && (
                                <motion.div
                                    key={'time'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChartTime data={{ ...data }} />
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
                                    <ChartSummary challenge={challenge} variant='table' />
                                </motion.div>
                            )}
                            {tab === TABS.JOURNAL && (
                                <motion.div
                                    key={'journal'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TradingHistory
                                        id={data.id}
                                        data={data.journalData}
                                        total={data.journalTotal}
                                        csv={data.journalCSV}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </>
            )}
        </Paper>
    )
}

Component.displayName = 'Graphs:History'

export default Component
