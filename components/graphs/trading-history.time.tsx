import 'moment/min/locales'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useReducer } from 'react'
import ReactDOMServer from 'react-dom/server'

import fetchTimeChart from '../../lib/challenges/time-chart-details'
import type TimeChartItem from '../../lib/challenges/time-chart-item.interface'
import { formatAmount, formatCurrency } from '../../lib/utils/amount'
import colorStops from '../../lib/utils/charts/color-stops'
import type { ColorStop } from '../../lib/utils/charts/fill.interface'
import type Point from '../../lib/utils/charts/point.interface'
import thresholds from '../../lib/utils/charts/thresholds'
import type PriceType from '../../lib/utils/price.interface'
import Skeleton from '../skeletons/challenge-details/trades'
import styles from './trading-history.time.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export enum Actions {
    START_FETCHING,
    FINISH_FETCHING,
}

export type Action =
    | {
          type: Actions.START_FETCHING
      }
    | {
          type: Actions.FINISH_FETCHING
          data: {
              data: Array<Point>
              yAxisMaximum: number
              yAxisMinimum: number
              colorStops: Array<ColorStop>
              raw: Array<TimeChartItem>
          }
      }

export interface State {
    id: string
    data: Array<Point>
    loading: boolean
    initial: boolean
    yAxisMaximum: number
    yAxisMinimum: number
    colorStops: Array<ColorStop>
    raw: Array<TimeChartItem>
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
        default:
            throw new Error(`Unknown action type`)
    }
}

export interface Data {
    id: string
    lower: PriceType
    balance: PriceType
    upper: PriceType
    account: PriceType
}

export interface Props {
    data: Data
    className?: string
}

const Component: React.FC<Props> = ({ data }: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const topThresholdLabel = t('thresholds.topThresholdLabel')
    const bottomThresholdLabel = t('thresholds.bottomThresholdLabel')
    const router = useRouter()

    const [state, dispatch] = useReducer(reducer, {
        id: data.id,
        loading: true,
        initial: true,
        data: [],
        yAxisMaximum: 1,
        yAxisMinimum: 0,
        colorStops: [],
        raw: [],
    })

    useEffect(() => {
        const fetch = async () => {
            dispatch({ type: Actions.START_FETCHING })

            const results = await fetchTimeChart(
                data.id,
                data.lower,
                data.upper,
                data.account
            )

            if (!results) {
                return
            }

            const points: Array<Point> = results.data.map(
                ({ x, y }: TimeChartItem): Point => ({ x, y })
            )

            const colors = colorStops(results.minimum, results.maximum)

            dispatch({
                type: Actions.FINISH_FETCHING,
                data: {
                    data: points,
                    yAxisMaximum: results.yAxisMaximum,
                    yAxisMinimum: results.yAxisMinimum,
                    colorStops: colors,
                    raw: results.data,
                },
            })
        }
        if (state.initial) {
            fetch()
        }
    }, [data, state])

    const formatTooltip = ({ dataPointIndex }: { dataPointIndex: number }) => {
        const pointData: TimeChartItem = state.raw[dataPointIndex]
        const date = pointData.label
        const value = pointData.y + data.account.amount
        const amountLocale = navigator.language
        const amount = formatAmount(value, true, 2, false, 'n/a', amountLocale)
        const currency = formatCurrency(data.account.currency, 'code')

        return ReactDOMServer.renderToString(
            <div className='apexcharts-trading-history-tooltip'>
                <h4>{t('tradingHistory.time.header')}</h4>
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
        <div className={classNames(styles.Root)}>
            <AnimatePresence initial={false} mode='wait'>
                {state.loading && (
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
                {!state.loading && isEmpty(state.data) && (
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
                {!state.loading && !isEmpty(state.data) && (
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
                            width='100%'
                            height='428px'
                            options={{
                                annotations: thresholds(
                                    data.lower,
                                    data.upper,
                                    data.account,
                                    state.data,
                                    topThresholdLabel,
                                    bottomThresholdLabel
                                ),
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                },
                                colors: ['var(--neutral-color-90)'],
                                dataLabels: {
                                    enabled: false,
                                },
                                markers: {
                                    size: 0,
                                },
                                grid: {
                                    padding: {
                                        top: 20,
                                    },
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shadeIntensity: 1,
                                        opacityFrom: 0.7,
                                        opacityTo: 0.9,
                                        colorStops: state.colorStops,
                                    },
                                },
                                yaxis: {
                                    opposite: true,
                                    tickAmount: 5,
                                    min: state.yAxisMinimum,
                                    max: state.yAxisMaximum,
                                    labels: {
                                        formatter: function (val) {
                                            return (val + data.account.amount).toFixed(0)
                                        },
                                    },
                                    title: {
                                        text: `${t('tradingHistory.time.yaxisTitle')}`,
                                        rotate: 0,
                                        offsetX: -22,
                                        offsetY: -1 * 428 * 0.45,
                                        style: {
                                            fontFamily: 'Roboto',
                                            cssClass: 'apexcharts-area-yaxis-label',
                                        },
                                    },
                                    tooltip: {
                                        enabled: false,
                                    },
                                },
                                xaxis: {
                                    type: 'datetime',
                                    title: {
                                        text: `${t('tradingHistory.time.xaxisTitle')}`,
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

Component.displayName = 'Graphs:TradingHistory.time'

export default Component
