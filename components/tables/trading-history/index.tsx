import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import classNames from 'classnames'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useReducer } from 'react'

import {
    TRADING_HISTORY_HEAD,
    TRADING_HISTORY_PER_PAGE,
} from '../../../lib/challenges/challenges.const'
import type TradesLogItem from '../../../lib/challenges/trades-log-item.interface'
import tradingLogs from '../../../lib/challenges/trades-logs'
import type CSVDataRow from '../../../lib/utils/csv-data-row.interface'
import Header from '../header.sorting'
import Pagination from '../pagination.general'
import FiltersActions from './actions'
import Body from './body'
import styles from './index.module.scss'

export enum Actions {
    CHANGE_PAGE_LOADING,
    CHANGE_PAGE_RESULTS,
    CHANGE_PER_PAGE_LOADING,
    CHANGE_PER_PAGE_RESULTS,
    CHANGE_SORTING_LOADING,
    CHANGE_SORTING_RESULTS,
    CHANGE_FROM_LOADING,
    CHANGE_FROM_RESULTS,
    CHANGE_TO_LOADING,
    CHANGE_TO_RESULTS,
    CLEAR_FILTERS_LOADING,
    CLEAR_FILTERS_RESULTS,
}

export interface State {
    data: Array<TradesLogItem>
    total: number
    csv: Array<CSVDataRow>
    rowsPerPage: number
    page: number
    loading: boolean
    orderBy: keyof TradesLogItem
    order: 'asc' | 'desc'
    filterFromDate: typeof moment | null
    filterToDate: typeof moment | null
}

export type Action =
    | {
          type: Actions.CHANGE_PAGE_LOADING
      }
    | {
          type: Actions.CHANGE_PAGE_RESULTS
          data: {
              data: Array<TradesLogItem>
              csv: Array<CSVDataRow>
              total: number
              page: number
          }
      }
    | {
          type: Actions.CHANGE_PER_PAGE_LOADING
      }
    | {
          type: Actions.CHANGE_PER_PAGE_RESULTS
          data: {
              data: Array<TradesLogItem>
              csv: Array<CSVDataRow>
              total: number
              rowsPerPage: number
          }
      }
    | {
          type: Actions.CHANGE_SORTING_LOADING
      }
    | {
          type: Actions.CHANGE_SORTING_RESULTS
          data: {
              data: Array<TradesLogItem>
              csv: Array<CSVDataRow>
              total: number
              orderBy: keyof TradesLogItem
              order: 'asc' | 'desc'
          }
      }
    | {
          type: Actions.CHANGE_FROM_LOADING
      }
    | {
          type: Actions.CHANGE_FROM_RESULTS
          data: {
              data: Array<TradesLogItem>
              csv: Array<CSVDataRow>
              total: number
              filterFromDate: typeof moment | null
          }
      }
    | {
          type: Actions.CHANGE_TO_LOADING
      }
    | {
          type: Actions.CHANGE_TO_RESULTS
          data: {
              data: Array<TradesLogItem>
              csv: Array<CSVDataRow>
              total: number
              filterToDate: typeof moment | null
          }
      }
    | {
          type: Actions.CLEAR_FILTERS_LOADING
      }
    | {
          type: Actions.CLEAR_FILTERS_RESULTS
          data: {
              data: Array<TradesLogItem>
              csv: Array<CSVDataRow>
              total: number
          }
      }

export interface Props {
    id: string
    data: Array<TradesLogItem>
    total: number
    csv: Array<CSVDataRow>
    className?: string
}

const Component: React.FC<Props> = ({
    data,
    className,
    total,
    id,
    csv,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const [state, dispatch] = useReducer(reducer, {
        data,
        total,
        page: 0,
        rowsPerPage: TRADING_HISTORY_PER_PAGE[0],
        loading: false,
        orderBy: 'openTime',
        order: 'desc',
        filterFromDate: null,
        filterToDate: null,
        csv,
    })

    const handleSorting = async (orderBy: string) => {
        dispatch({ type: Actions.CHANGE_SORTING_LOADING })

        const order = state.orderBy === orderBy && state.order === 'asc' ? 'desc' : 'asc'

        const results = await tradingLogs(
            id,
            state.rowsPerPage,
            0,
            orderBy,
            order,
            state.filterFromDate,
            state.filterToDate
        )

        if (!results) {
            dispatch({
                type: Actions.CHANGE_SORTING_RESULTS,
                data: {
                    data: state.data,
                    total: state.total,
                    order: state.order,
                    orderBy: state.orderBy,
                    csv: state.csv,
                },
            })
            return
        }

        dispatch({
            type: Actions.CHANGE_SORTING_RESULTS,
            data: {
                data: results.data,
                total: results.total,
                csv: results.csv,
                order,
                orderBy: orderBy as keyof TradesLogItem,
            },
        })
    }

    const handlePageChange = async (event: unknown, value: number) => {
        dispatch({ type: Actions.CHANGE_PAGE_LOADING })

        const results = await tradingLogs(
            id,
            state.rowsPerPage,
            value * state.rowsPerPage,
            state.orderBy,
            state.order,
            state.filterFromDate,
            state.filterToDate
        )

        if (!results) {
            // @todo handle error ?
            dispatch({
                type: Actions.CHANGE_PAGE_RESULTS,
                data: {
                    data: state.data,
                    total: state.total,
                    page: state.page,
                    csv: state.csv,
                },
            })
            return
        }

        dispatch({
            type: Actions.CHANGE_PAGE_RESULTS,
            data: {
                data: results.data,
                total: results.total,
                page: value,
                csv: results.csv,
            },
        })
    }

    const handleRowPerPageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: Actions.CHANGE_PER_PAGE_LOADING })
        const value: number = parseInt(event.target.value)

        const results = await tradingLogs(
            id,
            value,
            0,
            state.orderBy,
            state.order,
            state.filterFromDate,
            state.filterToDate
        )

        if (!results) {
            dispatch({
                type: Actions.CHANGE_PER_PAGE_RESULTS,
                data: {
                    data: state.data,
                    total: state.total,
                    rowsPerPage: state.rowsPerPage,
                    csv: state.csv,
                },
            })
            return
        }

        dispatch({
            type: Actions.CHANGE_PER_PAGE_RESULTS,
            data: {
                data: results.data,
                total: results.total,
                rowsPerPage: value,
                csv: results.csv,
            },
        })
    }

    const handleFromChange = async (value: typeof moment | null) => {
        dispatch({ type: Actions.CHANGE_FROM_LOADING })

        const results = await tradingLogs(
            id,
            state.rowsPerPage,
            state.rowsPerPage * state.page,
            state.orderBy,
            state.order,
            value,
            state.filterToDate
        )

        if (!results) {
            dispatch({
                type: Actions.CHANGE_FROM_RESULTS,
                data: {
                    data: state.data,
                    total: state.total,
                    filterFromDate: state.filterFromDate,
                    csv: state.csv,
                },
            })
            return
        }

        dispatch({
            type: Actions.CHANGE_FROM_RESULTS,
            data: {
                data: results.data,
                total: results.total,
                filterFromDate: value,
                csv: results.csv,
            },
        })
    }

    const handleToChange = async (value: typeof moment | null) => {
        dispatch({ type: Actions.CHANGE_TO_LOADING })

        const results = await tradingLogs(
            id,
            state.rowsPerPage,
            state.rowsPerPage * state.page,
            state.orderBy,
            state.order,
            state.filterFromDate,
            value
        )

        if (!results) {
            dispatch({
                type: Actions.CHANGE_TO_RESULTS,
                data: {
                    data: state.data,
                    total: state.total,
                    filterToDate: state.filterToDate,
                    csv: state.csv,
                },
            })
            return
        }

        dispatch({
            type: Actions.CHANGE_TO_RESULTS,
            data: {
                data: results.data,
                total: results.total,
                filterToDate: value,
                csv: results.csv,
            },
        })
    }

    const handleClearFilters = async () => {
        dispatch({ type: Actions.CLEAR_FILTERS_LOADING })

        const results = await tradingLogs(
            id,
            state.rowsPerPage,
            state.rowsPerPage * state.page,
            state.orderBy,
            state.order,
            null,
            null
        )

        if (!results) {
            dispatch({
                type: Actions.CLEAR_FILTERS_RESULTS,
                data: {
                    data: state.data,
                    total: state.total,
                    csv: state.csv,
                },
            })
            return
        }

        dispatch({
            type: Actions.CLEAR_FILTERS_RESULTS,
            data: {
                data: results.data,
                total: results.total,
                csv: results.csv,
            },
        })
    }

    return (
        <>
            <FiltersActions
                inputs={[
                    {
                        value: state.filterFromDate,
                        onChange: handleFromChange,
                        label: t('tradingHistory.journal.openedFrom.label'),
                    },
                    {
                        value: state.filterToDate,
                        onChange: handleToChange,
                        label: t('tradingHistory.journal.openedTo.label'),
                    },
                ]}
                handleClear={handleClearFilters}
                csv={state.csv}
                id={id}
            />
            <TableContainer className={classNames(className)} component={'div'}>
                <Table>
                    <Header
                        data={TRADING_HISTORY_HEAD}
                        orderBy={state.orderBy}
                        order={state.order}
                        handleSorting={handleSorting}
                        i18nNamespace='challenge-details'
                    />
                    <Body data={state.data} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={TRADING_HISTORY_PER_PAGE}
                component={'div'}
                count={state.total}
                rowsPerPage={state.rowsPerPage}
                page={state.page}
                ActionsComponent={Pagination}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowPerPageChange}
                className={styles.Pagination}
                labelRowsPerPage={t('common:paginationTitle')}
            />
        </>
    )
}

Component.displayName = 'Tables:Journal.trading-history'

export default Component

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.CLEAR_FILTERS_LOADING:
        case Actions.CHANGE_FROM_LOADING:
        case Actions.CHANGE_TO_LOADING:
        case Actions.CHANGE_SORTING_LOADING:
        case Actions.CHANGE_PER_PAGE_LOADING:
        case Actions.CHANGE_PAGE_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case Actions.CHANGE_TO_RESULTS:
        case Actions.CHANGE_FROM_RESULTS:
        case Actions.CHANGE_PAGE_RESULTS: {
            return {
                ...state,
                ...action.data,
                loading: false,
            }
        }
        case Actions.CHANGE_SORTING_RESULTS:
        case Actions.CHANGE_PER_PAGE_RESULTS: {
            return {
                ...state,
                ...action.data,
                loading: false,
                page: 0,
            }
        }
        case Actions.CLEAR_FILTERS_RESULTS: {
            return {
                ...state,
                ...action.data,
                filterFromDate: null,
                filterToDate: null,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}
