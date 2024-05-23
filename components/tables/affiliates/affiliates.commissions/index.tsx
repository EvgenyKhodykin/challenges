/* eslint-disable @typescript-eslint/no-unused-vars */
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import classNames from 'classnames'
import Campaign from 'lib/affiliates/campaign.interface'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useMemo, useReducer } from 'react'

import type AffiliateCommission from '../../../../lib/affiliates/affiliate-commission.interface'
import {
    COMMISSIONS_TABLE_HEAD,
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
    FETCH_COMMISSIONS_LOADING,
    FETCH_COMMISSIONS_RESULTS,
}

export interface State {
    allData: Array<AffiliateCommission>
    displayData: Array<AffiliateCommission>
    skip: number
    total: number
    rowsPerPage: number
    page: number
    loading: boolean
    orderBy: keyof AffiliateCommission
    order: 'asc' | 'desc'
}

export type Action =
    | {
          type: Actions.FETCH_COMMISSIONS_LOADING
          data: Array<AffiliateCommission>
      }
    | {
          type: Actions.FETCH_COMMISSIONS_RESULTS
          data: {
              displayData: Array<AffiliateCommission>
              total: number
          }
      }
    | {
          type: Actions.CHANGE_PAGE_LOADING
      }
    | {
          type: Actions.CHANGE_PAGE_RESULTS
          data: {
              commissions: Array<AffiliateCommission>
              page: number
          }
      }
    | {
          type: Actions.CHANGE_PER_PAGE_LOADING
      }
    | {
          type: Actions.CHANGE_PER_PAGE_RESULTS
          data: {
              commissions: Array<AffiliateCommission>
              rowsPerPage: number
          }
      }

export interface Props {
    commissions: Array<AffiliateCommission>
    campaigns: Array<Campaign>
    isLoading: boolean
    timeInterval: TIMES
    className?: string
}

const Component: React.FC<Props> = ({
    commissions,
    campaigns,
    isLoading,
    timeInterval,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('common')

    const sortedCommissions = useMemo(
        () =>
            commissions.toSorted((a, b) => {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()

                return dateB - dateA // For descending order
            }),
        [commissions]
    )

    const filteredCommissions = useMemo((): Array<AffiliateCommission> => {
        switch (timeInterval) {
            case TIMES.LAST_WEEK: {
                return sortedCommissions.filter(
                    (item) => item.createdAt >= moment().subtract(7, 'days').toISOString()
                )
            }
            case TIMES.LAST_MONTH: {
                return sortedCommissions.filter(
                    (item) =>
                        item.createdAt >= moment().subtract(1, 'months').toISOString()
                )
            }
            case TIMES.LAST_YEAR: {
                return sortedCommissions.filter(
                    (item) =>
                        item.createdAt >= moment().subtract(1, 'years').toISOString()
                )
            }
            case TIMES.LIFETIME: {
                return sortedCommissions
            }
            default: {
                return []
            }
        }
    }, [timeInterval, sortedCommissions])

    const [state, dispatch] = useReducer(reducer, {
        allData: sortedCommissions,
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
                commissions: data,
                page: value,
            },
        })
    }

    const handleRowPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: number = parseInt(event.target.value)

        dispatch({ type: Actions.CHANGE_PER_PAGE_LOADING })

        const data = state.allData.slice(0, value)

        dispatch({
            type: Actions.CHANGE_PER_PAGE_RESULTS,
            data: {
                commissions: data,
                rowsPerPage: value,
            },
        })
    }

    useEffect(() => {
        dispatch({
            type: Actions.FETCH_COMMISSIONS_LOADING,
            data: filteredCommissions,
        })

        const displayCommissions =
            filteredCommissions.length > 0
                ? filteredCommissions.slice(0, state.rowsPerPage)
                : []

        dispatch({
            type: Actions.FETCH_COMMISSIONS_RESULTS,
            data: {
                displayData: displayCommissions,
                total: filteredCommissions.length,
            },
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredCommissions])

    return (
        <>
            <TableContainer className={classNames(className)} component={'div'}>
                <List
                    headerData={COMMISSIONS_TABLE_HEAD}
                    orderBy={state.orderBy}
                    order={state.order}
                    handleSorting={() => undefined}
                    i18nNamespace='affiliates'
                    bodyData={state.displayData}
                    variant='commissions'
                    isLoading={isLoading}
                    campaigns={campaigns}
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

Component.displayName = 'Tables:Affiliates.Commissions'

export default Component

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.FETCH_COMMISSIONS_LOADING: {
            return {
                ...state,
                loading: true,
                allData: action.data,
            }
        }
        case Actions.FETCH_COMMISSIONS_RESULTS: {
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
                displayData: action.data.commissions,
                page: action.data.page,
            }
        }
        case Actions.CHANGE_PER_PAGE_RESULTS: {
            return {
                ...state,
                loading: false,
                displayData: action.data.commissions,
                page: 0,
                rowsPerPage: action.data.rowsPerPage,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}
