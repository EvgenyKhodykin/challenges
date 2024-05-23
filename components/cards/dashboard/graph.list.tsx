/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import isEmpty from 'lodash/isEmpty'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useReducer } from 'react'

import type Account from '../../../lib/accounts/account.interface'
import { ACCOUNTS_STATUS } from '../../../lib/accounts/accounts.const'
import fetchChart from '../../../lib/accounts/chart'
import type Point from '../../../lib/utils/charts/point.interface'
import styles from './graph.list.module.scss'

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
              min: number
              max: number
          }
      }

export interface State {
    data: Array<Point>
    min: number
    max: number
    loading: boolean
    initial: boolean
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

export interface TestIds {
    root?: string
}

export interface Props {
    data: Account
    className?: string
    testIds?: TestIds
}

const Component: React.FC<Props> = ({ className, testIds, data }: Props): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, {
        data: [],
        initial: true,
        loading: false,
        min: 0,
        max: 0,
    })

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
    }, [data.login, state.initial])

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'cards-body-challenge-root'}
        >
            <AnimatePresence>
                {!state.initial && !state.loading && !isEmpty(state.data) && (
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
        </div>
    )
}

Component.displayName = 'Cards:Dashboard:Graph.list'

export default Component
