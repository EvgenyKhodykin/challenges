import 'moment/min/locales'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useReducer } from 'react'
import ReactDOMServer from 'react-dom/server'

import tradesChart from '../../lib/challenges/trades-chart'
import type TradesChartItem from '../../lib/challenges/trades-chart-item.interface'
import { formatAmount, formatCurrency } from '../../lib/utils/amount'
import colorStops from '../../lib/utils/charts/color-stops'
import type { ColorStop } from '../../lib/utils/charts/fill.interface'
import { profit } from '../../lib/utils/charts/labels'
import type Point from '../../lib/utils/charts/point.interface'
import thresholds from '../../lib/utils/charts/thresholds'
import type PriceType from '../../lib/utils/price.interface'
import Skeleton from '../skeletons/challenge-details/trades'
import styles from './trading-history.trades.module.scss'

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
              raw: Array<TradesChartItem>
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
    raw: Array<TradesChartItem>
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

            const results = await tradesChart(
                data.id,
                data.lower,
                data.upper,
                data.account
            )

            if (!results) {
                return
            }

            const points: Array<Point> = results.data.map(
                ({ x, y }: TradesChartItem): Point => ({ x, y })
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
        const pointData: TradesChartItem = state.raw[dataPointIndex]
        const profit = pointData.profit
        const amountLocale = navigator.language
        const amount = formatAmount(profit.amount, true, 2, false, 'n/a', amountLocale)
        const currency = formatCurrency(profit.currency, 'code')

        return ReactDOMServer.renderToString(
            <div className='apexcharts-trading-history-trades-tooltip'>
                <div className='top'>
                    <h4>{t('tradingHistory.trades.header')}</h4>
                    <span>#{pointData.index}</span>
                </div>
                <div className='amount'>
                    <span>{amount}</span>
                    <sup>{currency}</sup>
                </div>
                <div className='date'>
                    {moment(pointData.date)
                        .locale(router.locale as string)
                        .format('ll')}
                </div>
            </div>
        )
    }

    const formatY = useCallback(
        (val: number) =>
            `${Math.sign(val) < 0 ? '-' : ''}${profit(Math.abs(val), data.account)}`,
        [data.account]
    )

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
                                        formatter: formatY,
                                    },
                                    title: {
                                        text: `${t('tradingHistory.trades.yaxisTitle')}`,
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
                                    type: 'numeric',
                                    decimalsInFloat: 0,
                                    tickAmount: 'dataPoints',
                                    title: {
                                        text: `${t('tradingHistory.trades.xaxisTitle')}`,
                                        offsetY: 75,
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
