/* eslint-disable @typescript-eslint/no-unused-vars */
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import classNames from 'classnames'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useMemo, useReducer } from 'react'

import type AffiliatePayout from '../../../../lib/affiliates/affiliate-payout.interface'
import {
    PAYOUT_TABLE_HEAD,
    STANDINGS_PER_PAGE,
    TIMES,
} from '../../../../lib/affiliates/affiliates.const'
import Pagination from '../../pagination.general'
import List from '../list'
import styles from './index.module.scss'

export enum Actions {
    CHANGE_PAGE_LOADING,
    CHANGE_PAGE_RESULTS,
    CHANGE_PER_PAGE_LOADING,
    CHANGE_PER_PAGE_RESULTS,
    FETCH_PAYOUTS_LOADING,
    FETCH_PAYOUTS_RESULTS,
}

export interface State {
    allData: Array<AffiliatePayout>
    displayData: Array<AffiliatePayout>
    skip: number
    total: number
    rowsPerPage: number
    page: number
    loading: boolean
    orderBy: keyof AffiliatePayout
    order: 'asc' | 'desc'
}

export type Action =
    | {
          type: Actions.FETCH_PAYOUTS_LOADING
          data: Array<AffiliatePayout>
      }
    | {
          type: Actions.FETCH_PAYOUTS_RESULTS
          data: {
              displayData: Array<AffiliatePayout>
              total: number
          }
      }
    | {
          type: Actions.CHANGE_PAGE_LOADING
      }
    | {
          type: Actions.CHANGE_PAGE_RESULTS
          data: {
              payouts: Array<AffiliatePayout>
              page: number
          }
      }
    | {
          type: Actions.CHANGE_PER_PAGE_LOADING
      }
    | {
          type: Actions.CHANGE_PER_PAGE_RESULTS
          data: {
              payouts: Array<AffiliatePayout>
              rowsPerPage: number
          }
      }

export interface Props {
    payouts: Array<AffiliatePayout>
    timeInterval: TIMES
    className?: string
}

const Component: React.FC<Props> = ({
    payouts,
    timeInterval,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('common')

    const sortedPayouts = useMemo(
        () =>
            payouts.toSorted((a, b) => {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()

                return dateB - dateA // For descending order
            }),
        [payouts]
    )

    const filteredPayouts = useMemo((): Array<AffiliatePayout> => {
        switch (timeInterval) {
            case TIMES.LAST_WEEK: {
                return sortedPayouts.filter(
                    (item) => item.createdAt >= moment().subtract(7, 'days').toISOString()
                )
            }
            case TIMES.LAST_MONTH: {
                return sortedPayouts.filter(
                    (item) =>
                        item.createdAt >= moment().subtract(1, 'months').toISOString()
                )
            }
            case TIMES.LAST_YEAR: {
                return sortedPayouts.filter(
                    (item) =>
                        item.createdAt >= moment().subtract(1, 'years').toISOString()
                )
            }
            case TIMES.LIFETIME: {
                return sortedPayouts
            }
            default: {
                return []
            }
        }
    }, [timeInterval, sortedPayouts])

    const [state, dispatch] = useReducer(reducer, {
        allData: sortedPayouts,
        displayData: [],
        skip: 0,
        total: 0,
        page: 0,
        rowsPerPage: STANDINGS_PER_PAGE[1],
        loading: false,
        orderBy: 'createdAt',
        order: 'desc',
    })

    const handlePageChange = (event: unknown, value: number) => {
        dispatch({ type: Actions.CHANGE_PAGE_LOADING })

        const data = state.allData.slice(
            value * state.rowsPerPage,
            value * state.rowsPerPage + state.rowsPerPage
        )

        dispatch({
            type: Actions.CHANGE_PAGE_RESULTS,
            data: {
                payouts: data,
                page: value,
            },
        })
    }

    const handleRowPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: Actions.CHANGE_PER_PAGE_LOADING })

        const value: number = parseInt(event.target.value)

        const data = state.allData.slice(0, value)

        dispatch({
            type: Actions.CHANGE_PER_PAGE_RESULTS,
            data: {
                payouts: data,
                rowsPerPage: value,
            },
        })
    }

    useEffect(() => {
        dispatch({ type: Actions.FETCH_PAYOUTS_LOADING, data: filteredPayouts })

        const displayPayouts =
            filteredPayouts.length > 0 ? filteredPayouts.slice(0, state.rowsPerPage) : []

        dispatch({
            type: Actions.FETCH_PAYOUTS_RESULTS,
            data: { displayData: displayPayouts, total: filteredPayouts.length },
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredPayouts])

    return (
        <>
            <TableContainer className={classNames(className)} component={'div'}>
                <List
                    headerData={PAYOUT_TABLE_HEAD}
                    orderBy={state.orderBy}
                    order={state.order}
                    handleSorting={() => undefined}
                    i18nNamespace='affiliates'
                    bodyData={state.displayData}
                    variant='payouts'
                    isLoading={state.loading}
                />
            </TableContainer>
            {state.displayData.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={STANDINGS_PER_PAGE}
                    component={'div'}
                    count={state.total}
                    rowsPerPage={state.rowsPerPage}
                    page={state.page}
                    ActionsComponent={Pagination}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowPerPageChange}
                    className={styles.Pagination}
                    labelRowsPerPage={t('paginationTitle')}
                />
            )}
        </>
    )
}

Component.displayName = 'Tables:Affiliates.Payouts'

export default Component

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.FETCH_PAYOUTS_LOADING: {
            return {
                ...state,
                loading: true,
                allData: action.data,
            }
        }
        case Actions.FETCH_PAYOUTS_RESULTS: {
            return {
                ...state,
                loading: false,
                displayData: action.data.displayData,
                total: action.data.total,
            }
        }
        case Actions.CHANGE_PER_PAGE_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case Actions.CHANGE_PAGE_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case Actions.CHANGE_PAGE_RESULTS: {
            return {
                ...state,
                loading: false,
                displayData: action.data.payouts,
                page: action.data.page,
            }
        }
        case Actions.CHANGE_PER_PAGE_RESULTS: {
            return {
                ...state,
                loading: false,
                displayData: action.data.payouts,
                page: 0,
                rowsPerPage: action.data.rowsPerPage,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}
