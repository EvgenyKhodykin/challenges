import Amount from 'components/amount/amount'
import { LiveEquityData } from 'components/sections/live-equity'
import Challenge from 'lib/challenges/challenge.interface'
import { durationBetweenDates } from 'lib/utils/time'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import styles from './summary.module.scss'

export interface Props {
    challenge: Challenge
    variant: 'table' | 'live'
    data?: LiveEquityData
}

const Component: React.FC<Props> = ({ challenge, variant, data }: Props) => {
    const { t } = useTranslation('challenge-details')
    const remainingTime = Number(durationBetweenDates(challenge.endDate).split('d')[0])

    const goal = useMemo(() => {
        if (data) {
            const difference = data.upper.amount - data.balance.amount
            return Math.sign(difference) > 0 ? difference : 0
        }
        return 0
    }, [data])

    if (variant === 'table') {
        return (
            <div className={styles.Summary}>
                <div className={styles.TableLine}>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>
                            {t('tradingHistory.summary.balance')}
                        </span>
                        <Amount
                            amount={challenge.balance.amount}
                            currency={'USD'}
                            position={'append'}
                            className={styles.Amount}
                            superscript
                        />
                    </div>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>
                            {t('tradingHistory.summary.equity')}
                        </span>
                        <Amount
                            amount={challenge.account.amount}
                            currency={'USD'}
                            position={'append'}
                            className={styles.Amount}
                            superscript
                        />
                    </div>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>{t('numberOfTrades')}</span>
                        <span className={styles.Value}>{challenge.tradesLogs.total}</span>
                    </div>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>
                            {t('tradingHistory.summary.averageTradeDuration')}
                        </span>
                        <span className={styles.Value}>
                            {challenge.averageTradeDuration
                                ? challenge.averageTradeDuration
                                : 'n/a'}
                        </span>
                    </div>
                </div>
                <div className={styles.TableLine}>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>
                            {t('tradingHistory.summary.winRate')}
                        </span>
                        <span className={styles.Percent}>{challenge.winRate}%</span>
                    </div>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>
                            {t('tradingHistory.summary.averageProfit')}
                        </span>
                        <Amount
                            amount={challenge.averageProfit}
                            currency={'USD'}
                            position={'append'}
                            className={styles.Amount}
                            superscript
                        />
                    </div>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>
                            {t('tradingHistory.summary.averageLoss')}
                        </span>
                        <Amount
                            amount={challenge.averageLoss}
                            currency={'USD'}
                            position={'append'}
                            className={styles.Amount}
                            superscript
                        />
                    </div>
                    <div className={styles.TableItem}>
                        <span className={styles.Label}>
                            {t('tradingHistory.summary.profitFactor')}
                        </span>
                        <span className={styles.Value}>{challenge.profitFactor}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.Summary}>
            <div className={styles.LiveLine}>
                <div className={styles.LiveItem}>
                    <span className={styles.Label}>
                        {t('liveEquity.unrealizedProfit')}
                    </span>
                    <Amount
                        amount={550}
                        currency={'USD'}
                        position={'append'}
                        className={styles.Amount}
                        superscript
                    />
                </div>
                <div className={styles.LiveItem}>
                    <span className={styles.Label}>{t('numberOfTrades')}</span>
                    <span className={styles.Value}>{data?.trades}</span>
                </div>
            </div>
            <div className={styles.LiveLine}>
                <div className={styles.LiveItem}>
                    <span className={styles.Label}>{t('liveEquity.profitToGoal')}</span>
                    <Amount
                        amount={Math.ceil(goal / remainingTime)}
                        currency={'USD'}
                        position={'append'}
                        className={styles.Amount}
                        superscript
                    />
                </div>
                <div className={styles.LiveItem}>
                    <span className={styles.Label}>{t('liveEquity.commitedFunds')}</span>
                    <span className={styles.Percent}>
                        41<sup>%</sup>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Component
