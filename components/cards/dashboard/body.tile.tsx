/* eslint-disable react-hooks/exhaustive-deps */
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import getAccessToken from 'lib/authentication/jwt/get-access-token'
import isEmpty from 'lodash/isEmpty'
import round from 'lodash/round'
import dynamic from 'next/dynamic'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useMemo, useReducer } from 'react'

import type Account from '../../../lib/accounts/account.interface'
import { ACCOUNTS_STATUS } from '../../../lib/accounts/accounts.const'
import fetchChart from '../../../lib/accounts/chart'
import { PASSING_STATUS } from '../../../lib/api/challenges/challenges.const'
import ApiChallengeReset from '../../../lib/api/challenges/reset'
import { DASHBOARD_CARD_AMOUNT_DISPLAY } from '../../../lib/challenges/challenges.const'
import type Point from '../../../lib/utils/charts/point.interface'
import type Price from '../../../lib/utils/price.interface'
import Amount from '../../amount/amount'
import ButtonRestart from '../../buttons/dashboard/restart'
import type { DAY } from '../../icons/calendar'
import IconCalendar from '../../icons/calendar'
import IconCalendarArrowDown from '../../icons/calendar.arrow-down'
import IconChartArrowDown from '../../icons/chart.arrow-down'
import IconChartArrowUp from '../../icons/chart.arrow-up'
import IconTrophy from '../../icons/trophy'
import Participants from '../competition/participants'
import styles from './body.tile.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export enum Actions {
    START_FETCHING,
    FINISH_FETCHING,
    SWITCH_RESETTABLE,
}

export type Action =
    | {
          type: Actions.START_FETCHING
      }
    | {
          type: Actions.FINISH_FETCHING
          data: {
              data: Array<Point>
              min: number
              max: number
          }
      }
    | {
          type: Actions.SWITCH_RESETTABLE
      }

export interface State {
    data: Array<Point>
    min: number
    max: number
    loading: boolean
    initial: boolean
    isResettable: boolean
}

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.START_FETCHING: {
            return {
                ...state,
                loading: true,
                initial: false,
                data: [],
            }
        }
        case Actions.FINISH_FETCHING: {
            return {
                ...state,
                ...action.data,
                loading: false,
                initial: false,
            }
        }
        case Actions.SWITCH_RESETTABLE: {
            return {
                ...state,
                isResettable: true,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}

export interface TestIds {
    root?: string
}

export interface Props {
    data: Account
    amountVariant: DASHBOARD_CARD_AMOUNT_DISPLAY
    onRules?: () => void
    onFails?: () => void
    onRestart?: React.MouseEventHandler
    className?: string
    testIds?: TestIds
    displayVariant?: 'card' | 'preview'
}

const Body: React.FC<Props> = ({
    className,
    testIds,
    data,
    amountVariant,
    onRules = () => undefined,
    onFails = () => undefined,
    onRestart = () => undefined,
    displayVariant,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')
    const token = getAccessToken()

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        initial: true,
        loading: false,
        min: 0,
        max: 0,
        isResettable: false,
    })

    useEffect(() => {
        ;(async () => {
            const result = await ApiChallengeReset(token as string, data.id)
            if (!result) {
                return
            }
            if (result.isResettable) {
                dispatch({ type: Actions.SWITCH_RESETTABLE })
            }
        })()
    }, [])

    const graphLineColor = useMemo(() => {
        switch (data.status) {
            case ACCOUNTS_STATUS.FAILED:
                return 'var(--error-color-main)'
            case ACCOUNTS_STATUS.PASSED:
                return 'var(--success-color-main)'
            default:
                return 'var(--text-color-primary)'
        }
    }, [data.status])

    const graphShadowColor = useMemo(() => {
        switch (data.status) {
            case ACCOUNTS_STATUS.FAILED:
                return 'var(--error-color-main)'
            case ACCOUNTS_STATUS.PASSED:
                return 'var(--success-color-main)'
            default:
                return 'var(--text-color-tertiary)'
        }
    }, [data.status])

    const isButtonRestartVisible = useMemo(
        () =>
            data.status === ACCOUNTS_STATUS.ONGOING &&
            state.isResettable &&
            displayVariant !== 'preview',
        [data, state.isResettable, displayVariant]
    )

    const rules = useMemo(() => {
        switch (data.status) {
            case ACCOUNTS_STATUS.FAILED: {
                const {
                    targetLeftToEarn,
                    tradingDays,
                    todayPermittedLoss,
                    maxPermittedLoss,
                } = data
                const isTarget = targetLeftToEarn.status === PASSING_STATUS.FAILED
                const isDays = tradingDays.status === PASSING_STATUS.FAILED
                const isDailyLoss = todayPermittedLoss.status === PASSING_STATUS.FAILED
                const isMaxLoss = maxPermittedLoss.status === PASSING_STATUS.FAILED
                return (
                    <div className={styles.FailedRules}>
                        {isTarget && (
                            <Tooltip
                                title={t(
                                    'challengeTiles.tooltips.targetAmountLeftToEarn'
                                )}
                                placement={'top'}
                            >
                                <IconButton className={styles.Button} onClick={onFails}>
                                    <IconChartArrowUp className={styles.Icon} />
                                </IconButton>
                            </Tooltip>
                        )}
                        {isDays && (
                            <Tooltip
                                title={t('challengeTiles.tooltips.tradingDays')}
                                placement={'top'}
                            >
                                <IconButton className={styles.Button} onClick={onFails}>
                                    <IconCalendar
                                        day={tradingDays.min as DAY}
                                        className={styles.Icon}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        {isDailyLoss && (
                            <Tooltip
                                title={t('challengeTiles.tooltips.todayPermittedLoss')}
                                placement={'top'}
                            >
                                <IconButton className={styles.Button} onClick={onFails}>
                                    <IconCalendarArrowDown className={styles.Icon} />
                                </IconButton>
                            </Tooltip>
                        )}
                        {isMaxLoss && (
                            <Tooltip
                                title={t('challengeTiles.tooltips.maxPermittedLoss')}
                                placement={'top'}
                            >
                                <IconButton className={styles.Button} onClick={onFails}>
                                    <IconChartArrowDown className={styles.Icon} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                )
            }
            case ACCOUNTS_STATUS.ONGOING: {
                const { targetLeftToEarn, tradingDays } = data
                const targetPassed = targetLeftToEarn.status === PASSING_STATUS.PASSED
                const daysPassed = tradingDays.status === PASSING_STATUS.PASSED
                return (
                    <div className={styles.OngoingRules}>
                        <Tooltip
                            title={t('challengeTiles.tooltips.targetAmountLeftToEarn')}
                            placement={'top'}
                        >
                            <IconButton className={styles.Button} onClick={onRules}>
                                <IconChartArrowUp
                                    className={classNames(styles.Icon, {
                                        [styles.Passed]: targetPassed,
                                    })}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={t('challengeTiles.tooltips.tradingDays')}
                            placement={'top'}
                        >
                            <IconButton className={styles.Button} onClick={onRules}>
                                <IconCalendar
                                    day={data.tradingDays.min as DAY}
                                    className={classNames(styles.Icon, {
                                        [styles.Passed]: daysPassed,
                                    })}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
            default:
                return <></>
        }
    }, [data, t])

    const foreGroundLabel = useMemo(() => {
        switch (amountVariant) {
            case DASHBOARD_CARD_AMOUNT_DISPLAY.AMOUNT_TO_GOAL:
                return t('challengeTiles.foreGroundLabels.amountToGoal')
            case DASHBOARD_CARD_AMOUNT_DISPLAY.BALANCE:
                return t('challengeTiles.foreGroundLabels.balance')
            case DASHBOARD_CARD_AMOUNT_DISPLAY.PROFIT:
            default:
                return t('challengeTiles.foreGroundLabels.currentProfit')
        }
    }, [amountVariant, t])

    const foreGroundCompetition = useMemo(() => {
        const { type, balance, account, upper } = data

        if (type !== 'competition') {
            return <></>
        }

        let value = 0
        switch (amountVariant) {
            case DASHBOARD_CARD_AMOUNT_DISPLAY.AMOUNT_TO_GOAL: {
                const diff = upper.amount - balance.amount
                value = Math.sign(diff) > 0 ? (diff / account.amount) * 100 : 0
                break
            }
            case DASHBOARD_CARD_AMOUNT_DISPLAY.BALANCE: {
                value = (balance.amount / account.amount) * 100
                break
            }
            case DASHBOARD_CARD_AMOUNT_DISPLAY.PROFIT:
            default: {
                const difference = balance.amount - account.amount

                value = (difference / account.amount) * 100
                break
            }
        }

        return (
            <div
                className={classNames(styles.ForeGroundCompetition, {
                    [styles.Preview]: displayVariant === 'preview',
                })}
            >
                {displayVariant !== 'preview' && <IconTrophy className={styles.Icon} />}
                <span className={styles.Label}>
                    {displayVariant !== 'preview' && foreGroundLabel}
                </span>
                <span className={styles.Amount}>
                    {value.toFixed(2)}
                    <sup>%</sup>
                </span>
                {displayVariant !== 'preview' && (
                    <Participants
                        totalParticipants={data.numOfRegisteredUsers ?? 0}
                        rank={data.ranking?.rank ?? 0}
                    />
                )}
            </div>
        )
    }, [data, foreGroundLabel])

    const foreGroundChallenge = useMemo(() => {
        const { status, type } = data
        if (type !== 'challenge') {
            return <></>
        }

        let value: Price = {
            amount: 0,
            currency: data.account.currency,
        }
        switch (amountVariant) {
            case DASHBOARD_CARD_AMOUNT_DISPLAY.AMOUNT_TO_GOAL:
                const amount = round(data.upper.amount - data.balance.amount, 2)
                value = {
                    amount: amount < 0 ? 0 : amount,
                    currency: data.account.currency,
                }
                break
            case DASHBOARD_CARD_AMOUNT_DISPLAY.BALANCE:
                value = {
                    ...data.balance,
                }
                break
            case DASHBOARD_CARD_AMOUNT_DISPLAY.PROFIT:
            default:
                value = {
                    amount: round(data.balance.amount - data.account.amount, 2),
                    currency: data.account.currency,
                }
                break
        }

        return (
            <div
                className={classNames(styles.ForeGroundChallenge, {
                    [styles.Preview]: displayVariant === 'preview',
                })}
            >
                <span className={styles.Label}>
                    {displayVariant !== 'preview' && foreGroundLabel}
                </span>
                <Amount
                    amount={value.amount}
                    currency={value.currency}
                    position={'append'}
                    zeroAmount={'0'}
                    superscript
                    className={styles.Amount}
                />
                {isButtonRestartVisible && (
                    <ButtonRestart className={styles.Button} onClick={onRestart} />
                )}
                {displayVariant !== 'preview' && rules}
            </div>
        )
    }, [
        data.account.amount,
        data.balance.amount,
        amountVariant,
        rules,
        onRestart,
        foreGroundLabel,
    ])

    useEffect(() => {
        const fetch = async () => {
            dispatch({ type: Actions.START_FETCHING })

            const results = await fetchChart(data.id, data.account)
            if (!results) {
                return
            }
            dispatch({
                type: Actions.FINISH_FETCHING,
                data: {
                    data: results.data,
                    min: results.min,
                    max: results.max,
                },
            })
        }
        if (state.initial) {
            fetch()
        }
    }, [data, state.initial])

    const isChartVisible =
        !state.initial &&
        !state.loading &&
        !isEmpty(state.data) &&
        displayVariant !== 'preview'

    return (
        <div
            className={classNames(styles.Root, className, {
                [styles.Hover]: data.status === ACCOUNTS_STATUS.ONGOING,
            })}
            data-testid={testIds?.root ?? 'cards-body-challenge-root'}
        >
            <AnimatePresence>
                {isChartVisible && (
                    <motion.div
                        key={'graph'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.Graph}
                    >
                        <Chart
                            type='area'
                            series={[
                                {
                                    data: state.data,
                                },
                            ]}
                            width='100%'
                            height='100%'
                            options={{
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                    sparkline: {
                                        enabled: true,
                                    },
                                    dropShadow: {
                                        enabled: true,
                                        blur: 7.5,
                                        top: 15,
                                        color: graphShadowColor,
                                    },
                                },
                                colors: [graphLineColor],
                                dataLabels: {
                                    enabled: false,
                                },
                                markers: {
                                    size: 0,
                                },
                                fill: {
                                    type: 'solid',
                                    colors: ['transparent'],
                                },
                                stroke: {
                                    width: 2,
                                },
                                yaxis: {
                                    show: false,
                                    min: state.min,
                                    max: state.max,
                                },
                                xaxis: {
                                    type: 'datetime',
                                    title: {
                                        text: 'Traded Days',
                                        offsetY: 70,
                                        style: {
                                            fontFamily: 'Roboto',
                                            cssClass: 'apexcharts-area-xaxis-label',
                                        },
                                    },
                                    tooltip: {
                                        enabled: false,
                                    },
                                },
                                tooltip: {
                                    enabled: false,
                                },
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            {foreGroundChallenge}
            {foreGroundCompetition}
        </div>
    )
}

Body.displayName = 'Cards:Body.challenge'

export default Body
