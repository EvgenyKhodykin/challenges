/* eslint-disable react-hooks/exhaustive-deps */
import 'moment/min/locales'

import classNames from 'classnames'
import Amount from 'components/amount/amount'
import { AnimatePresence, motion } from 'framer-motion'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useReducer } from 'react'
import ReactDOMServer from 'react-dom/server'

import { LIVE_CHART_FETCH_MS_INTERVAL } from '../../lib/challenges/challenges.const'
import liveAreaChart from '../../lib/challenges/live-area-chart'
import type LiveAreaChartItem from '../../lib/challenges/live-area-chart-item.interface'
import { formatAmount, formatCurrency } from '../../lib/utils/amount'
import { balance } from '../../lib/utils/charts/labels'
import type Point from '../../lib/utils/charts/point.interface'
import type Price from '../../lib/utils/price.interface'
import Skeleton from '../skeletons/challenge-details/live-equity'
import styles from './live-equity.area.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export enum Actions {
    START_FETCHING,
    FINISH_FETCHING,
    START_REFRESHING,
    FINISH_REFRESHING,
}

export type Action = {
    type: Actions.FINISH_FETCHING
    data: {
        data: Array<Point>
        raw: Array<LiveAreaChartItem>
    }
}

export interface State {
    data: Array<Point>
    initial: boolean
    raw: Array<LiveAreaChartItem>
}

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.FINISH_FETCHING: {
            return {
                ...state,
                ...action.data,
                initial: false,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}

export interface Data {
    id: string
    account: Price
    trades: number
    balance: Price
}

export interface Props {
    data: Data
    className?: string
    onUpdate?: () => void
}

const Component: React.FC<Props> = ({
    className,
    data,
    onUpdate = () => undefined,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const router = useRouter()
    const [state, dispatch] = useReducer(reducer, {
        data: [],
        initial: true,
        raw: [],
    })

    useEffect(() => {
        const fetch = async () => {
            const results = await liveAreaChart(
                data.id,
                moment().subtract(24, 'hours').toISOString(),
                data.account
            )

            if (!results || isEmpty(results.data)) {
                dispatch({
                    type: Actions.FINISH_FETCHING,
                    data: {
                        data: state.data,
                        raw: state.raw,
                    },
                })
                return
            }

            const points: Array<Point> = results.data.map(
                ({ x, y }: LiveAreaChartItem): Point => ({ x, y })
            )

            dispatch({
                type: Actions.FINISH_FETCHING,
                data: {
                    data: points,
                    raw: results.data,
                },
            })
        }

        let interval: NodeJS.Timer
        if (state.initial) {
            interval = setInterval(() => {
                fetch()
                onUpdate()
            }, LIVE_CHART_FETCH_MS_INTERVAL)
            fetch()
        }
        return () => {
            clearInterval(interval)
        }
    }, [data.id])

    const formatTooltip = ({ dataPointIndex }: { dataPointIndex: number }) => {
        const pointData: LiveAreaChartItem = state.raw[dataPointIndex]
        const date = pointData.label
        const value = pointData.y + data.account.amount
        const amountLocale = navigator.language
        const amount = formatAmount(value, true, 2, false, 'n/a', amountLocale)
        const currency = formatCurrency(data.account.currency, 'code')

        return ReactDOMServer.renderToString(
            <div className='apexcharts-trading-history-tooltip'>
                <h4>{t('liveEquity.accountEquity')}</h4>
                <div>
                    <span>{amount}</span>
                    <sup>{currency}</sup>
                </div>
                <small>
                    {moment(date)
                        .locale(router.locale as string)
                        .format('ll')}
                </small>
            </div>
        )
    }

    return (
        <div className={classNames(styles.Root, className)}>
            <AnimatePresence initial={false} mode='wait'>
                {state.initial && (
                    <motion.div
                        key={'loading'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.Loading}
                    >
                        <Skeleton isToggled />
                    </motion.div>
                )}
                {isEmpty(state.data) && data.trades > 0 && (
                    <motion.div
                        key={'noActiveTrades'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.NoActiveTrades}
                    >
                        <div>
                            <Amount
                                amount={data.balance.amount}
                                currency={data.balance.currency}
                                position={'append'}
                                zeroAmount={'0'}
                                superscript
                                className={styles.Amount}
                            />
                        </div>
                        <p>{t('liveEquity.noActiveTrades')}</p>
                    </motion.div>
                )}
                {!state.initial && isEmpty(state.data) && data.trades < 1 && (
                    <motion.div
                        key={'empty'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.Empty}
                    >
                        <span className={styles.Label}>{t('message')}</span>
                    </motion.div>
                )}

                {!state.initial && !isEmpty(state.data) && (
                    <motion.div
                        key={'graph'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Chart
                            type='area'
                            series={[
                                {
                                    data: state.data,
                                },
                            ]}
                            height='380px'
                            width='100%'
                            options={{
                                chart: {
                                    type: 'area',
                                    stacked: false,
                                    height: 380,
                                    width: '100%',
                                    zoom: {
                                        type: 'x',
                                        enabled: true,
                                        autoScaleYaxis: true,
                                    },
                                    toolbar: {
                                        tools: {},
                                    },
                                },
                                colors: ['var(--neutral-color-90)'],
                                dataLabels: {
                                    enabled: false,
                                },
                                markers: {
                                    size: 0,
                                },
                                title: {
                                    text: `${t('liveEquity.accountEquity')}`,
                                    align: 'left',
                                    style: {
                                        fontFamily: 'Roboto',
                                        color: 'var(--text-color-secondary)',
                                        fontWeight: 400,
                                        fontSize: '12px',
                                    },
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shadeIntensity: 1,
                                        inverseColors: false,
                                        opacityFrom: 0.5,
                                        opacityTo: 0,
                                        stops: [0, 90, 100],
                                    },
                                },
                                yaxis: {
                                    opposite: true,
                                    labels: {
                                        formatter: function (value) {
                                            return balance(value, data.account)
                                        },
                                    },
                                    title: {
                                        text: '',
                                    },
                                    tooltip: {
                                        enabled: false,
                                    },
                                },
                                xaxis: {
                                    type: 'datetime',
                                    tooltip: {
                                        enabled: false,
                                    },
                                },
                                tooltip: {
                                    shared: false,
                                    custom: formatTooltip,
                                },
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

Component.displayName = 'Graphs:Chart.area'

export default Component
