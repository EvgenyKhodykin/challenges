/* eslint-disable react-hooks/exhaustive-deps */
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import type { Theme } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import Price from 'lib/utils/price.interface'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import { TARGET_PROFIT_STATUS } from '../../../lib/challenges/challenges.const'
import Amount from '../../amount/amount'
import Graph from '../../graphs/linear.slider'
import Chart from '../../icons/chart.arrow-up'
import Skeleton from '../../skeletons/challenge-details/graphs'
import Paper from '../../surfaces/paper'
import styles from './profit.module.scss'

export interface ProfitData {
    lower: Price
    balance: Price
    upper: Price
    account: Price
    status: TARGET_PROFIT_STATUS
}

export interface Props {
    data: ProfitData
    isLoading: boolean
    className?: string
}

const Component: React.FC<Props> = ({
    data,
    isLoading,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const [collapsed, toggleCollapsed] = useCycle<number>(0, 1)

    const profit = useMemo(
        () => ({
            amount: data.balance.amount - data.account.amount,
            currency: data.balance.currency,
        }),
        [data.account.amount, data.balance.amount]
    )

    const goal = useMemo(() => {
        const difference = data.upper.amount - data.balance.amount
        return Math.sign(difference) > 0
            ? {
                  amount: difference,
                  currency: data.balance.currency,
              }
            : {
                  amount: 0,
                  currency: data.balance.currency,
              }
    }, [data.upper.amount, data.balance.amount])

    const targetPercent = useMemo(
        () => ((data.upper.amount - data.account.amount) / data.account.amount) * 100,
        [data.upper.amount, data.account.amount]
    )

    const realizedPercent = useMemo(() => {
        const difference = data.balance.amount - data.account.amount

        return (difference / data.account.amount) * 100
    }, [data.account.amount, data.balance.amount, data.upper.amount])

    return (
        <Paper className={classNames(styles.Root, className)}>
            {isDesktop && (
                <>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <>
                            <div className={styles.Top}>
                                <div className={styles.Title}>
                                    <span
                                        className={classNames(styles.Icon, {
                                            [styles.Success]:
                                                data.status ===
                                                TARGET_PROFIT_STATUS.SUCCESS,
                                            [styles.InProgress]:
                                                data.status ===
                                                TARGET_PROFIT_STATUS.NOT_COMPLETED,
                                            [styles.Failure]:
                                                data.status ===
                                                TARGET_PROFIT_STATUS.FAILURE,
                                        })}
                                    >
                                        <Chart className={styles.Chart} />
                                    </span>
                                    <span className={styles.Text}>
                                        {t('realizedProfit.title')}
                                    </span>
                                    <Amount
                                        amount={profit.amount}
                                        currency={profit.currency}
                                        position={'append'}
                                        zeroAmount={'0'}
                                        superscript
                                        className={classNames(styles.RealizedProfit, {
                                            [styles.Positive]:
                                                Math.sign(profit.amount) > 0,
                                            [styles.Negative]:
                                                Math.sign(profit.amount) < 0,
                                        })}
                                    />
                                </div>
                                <span className={styles.Percent}>
                                    {realizedPercent.toFixed(1)}
                                    <sup>%</sup>
                                </span>
                            </div>
                            <div className={styles.Middle}>
                                <Graph
                                    data={{
                                        account: {
                                            ...data.account,
                                        },
                                        balance: {
                                            ...data.balance,
                                        },
                                        upper: {
                                            ...data.upper,
                                        },
                                        lower: {
                                            ...data.lower,
                                        },
                                    }}
                                />
                            </div>
                            <div className={styles.Bottom}>
                                <span className={styles.ToGoal}>
                                    {t('toGoal')}{' '}
                                    <Amount
                                        amount={goal.amount}
                                        currency={goal.currency}
                                        className={styles.Amount}
                                        position={'append'}
                                        zeroAmount={'0'}
                                        superscript
                                    />
                                </span>
                                <span className={styles.GoalPercent}>
                                    {`${t('target')} ${targetPercent.toFixed(1)}%`}
                                </span>
                            </div>
                        </>
                    )}
                </>
            )}
            {!isDesktop && (
                <AnimatePresence initial={false} mode='wait'>
                    {!collapsed && (
                        <>
                            {isLoading ? (
                                <Skeleton isDesktop={false} />
                            ) : (
                                <motion.div
                                    key={'preview'}
                                    initial={{ opacity: 1 }}
                                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ButtonBase
                                        focusRipple
                                        onClick={() => toggleCollapsed()}
                                        className={styles.Preview}
                                    >
                                        <div className={styles.Heading}>
                                            <div className={styles.Title}>
                                                <span
                                                    className={classNames(styles.Icon, {
                                                        [styles.Positive]:
                                                            Math.sign(profit.amount) > 0,
                                                        [styles.Negative]:
                                                            Math.sign(profit.amount) < 0,
                                                    })}
                                                >
                                                    <Chart className={styles.Chart} />
                                                </span>
                                                <span className={styles.Text}>
                                                    {t('realizedProfit.title')}
                                                </span>
                                            </div>
                                            <ExpandMoreIcon className={styles.Expand} />
                                        </div>
                                        <div className={styles.Body}>
                                            <Graph
                                                data={{
                                                    account: {
                                                        ...data.account,
                                                    },
                                                    balance: {
                                                        ...data.balance,
                                                    },
                                                    upper: {
                                                        ...data.upper,
                                                    },
                                                    lower: {
                                                        ...data.lower,
                                                    },
                                                }}
                                                className={styles.Graph}
                                            />
                                        </div>
                                    </ButtonBase>
                                </motion.div>
                            )}
                        </>
                    )}
                    {!!collapsed && (
                        <motion.div
                            key={'detailed'}
                            initial={{
                                opacity: 0,
                                height: 151,
                            }}
                            animate={{
                                opacity: 1,
                                height: 205,
                            }}
                            transition={{
                                ease: 'easeInOut',
                                height: {
                                    duration: 0.4,
                                },
                                opacity: {
                                    delay: 0.2,
                                    duration: 0.3,
                                },
                            }}
                            className={styles.Details}
                        >
                            <div className={styles.Top}>
                                <div className={styles.Title}>
                                    <span
                                        className={classNames(styles.Icon, {
                                            [styles.Positive]:
                                                Math.sign(profit.amount) > 0,
                                            [styles.Negative]:
                                                Math.sign(profit.amount) < 0,
                                        })}
                                    >
                                        <Chart className={styles.Chart} />
                                    </span>
                                    <span className={styles.Text}>
                                        {' '}
                                        {t('realizedProfit.title')}
                                    </span>
                                    <Amount
                                        amount={profit.amount}
                                        currency={profit.currency}
                                        position={'append'}
                                        zeroAmount={'0'}
                                        superscript
                                        className={classNames(styles.RealizedProfit, {
                                            [styles.Positive]:
                                                Math.sign(profit.amount) > 0,
                                            [styles.Negative]:
                                                Math.sign(profit.amount) < 0,
                                        })}
                                    />
                                </div>
                                <span className={styles.Percent}>
                                    {realizedPercent.toFixed(1)}
                                    <sup>%</sup>
                                </span>
                            </div>
                            <div className={styles.Middle}>
                                <Graph
                                    data={{
                                        account: {
                                            ...data.account,
                                        },
                                        balance: {
                                            ...data.balance,
                                        },
                                        upper: {
                                            ...data.upper,
                                        },
                                        lower: {
                                            ...data.lower,
                                        },
                                    }}
                                    className={styles.Graph}
                                />
                            </div>
                            <div className={styles.Bottom}>
                                <span className={styles.ToGoal}>
                                    {t('toGoal')}{' '}
                                    <Amount
                                        amount={goal.amount}
                                        currency={goal.currency}
                                        className={styles.Amount}
                                        position={'append'}
                                        zeroAmount={'0'}
                                        superscript
                                    />
                                </span>
                                <span className={styles.GoalPercent}>
                                    {`${t('target')} ${targetPercent.toFixed(1)}%`}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </Paper>
    )
}

Component.displayName = 'Graphs:Profit'

export default Component
