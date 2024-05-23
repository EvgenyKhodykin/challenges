/* eslint-disable @typescript-eslint/no-unused-vars */

import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useMemo, useReducer } from 'react'

import type AffiliateReferral from '../../../../lib/affiliates/affiliate-referral.interface'
import {
    REFERRALS_TABLE_HEAD,
    STANDINGS_PER_PAGE,
    TIMES,
} from '../../../../lib/affiliates/affiliates.const'
import getReferralsList from '../../../../lib/affiliates/get-referrals-list'
import Pagination from '../../pagination.general'
import List from '../list'
import styles from './index.module.scss'

export enum Actions {
    CHANGE_PAGE_LOADING,
    CHANGE_PAGE_RESULTS,
    CHANGE_PER_PAGE_LOADING,
    CHANGE_PER_PAGE_RESULTS,
    FETCH_REFERRALS_LOADING,
    FETCH_REFERRALS_RESULTS,
}

export interface State {
    data: Array<AffiliateReferral>
    skip: number
    total: number
    rowsPerPage: number
    page: number
    loading: boolean
    orderBy: keyof AffiliateReferral
    order: 'asc' | 'desc'
}

export type Action =
    | {
          type: Actions.FETCH_REFERRALS_LOADING
      }
    | {
          type: Actions.FETCH_REFERRALS_RESULTS
          data: {
              referrals: Array<AffiliateReferral>
              total: number
          }
      }
    | {
          type: Actions.CHANGE_PAGE_LOADING
      }
    | {
          type: Actions.CHANGE_PAGE_RESULTS
          data: {
              referrals: Array<AffiliateReferral>
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
              referrals: Array<AffiliateReferral>
              total: number
              rowsPerPage: number
          }
      }

export interface Props {
    timeInterval: TIMES
    className?: string
}

const Component: React.FC<Props> = ({ timeInterval, className }: Props): JSX.Element => {
    const { t } = useTranslation('common')

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        skip: 0,
        total: 0,
        page: 0,
        rowsPerPage: STANDINGS_PER_PAGE[1],
        loading: false,
        orderBy: 'createdAt',
        order: 'desc',
    })

    const filterPayload = useMemo((): Partial<{ [key: string]: string }> => {
        switch (timeInterval) {
            case TIMES.LAST_WEEK: {
                return {
                    createdAtFromDate: moment().subtract(7, 'days').toISOString(),
                    createdAtToDate: moment().toISOString(),
                }
            }
            case TIMES.LAST_MONTH: {
                return {
                    createdAtFromDate: moment().subtract(1, 'months').toISOString(),
                    createdAtToDate: moment().toISOString(),
                }
            }
            case TIMES.LAST_YEAR: {
                return {
                    createdAtFromDate: moment().subtract(1, 'years').toISOString(),
                    createdAtToDate: moment().toISOString(),
                }
            }
            case TIMES.LIFETIME: {
                return {
                    createdAtFromDate: undefined,
                    createdAtToDate: undefined,
                }
            }
            default: {
                return {}
            }
        }
    }, [timeInterval])

    const handlePageChange = useCallback(
        async (event: unknown, value: number) => {
            dispatch({ type: Actions.CHANGE_PAGE_LOADING })

            const results = await getReferralsList(
                state.rowsPerPage,
                value * state.rowsPerPage,
                {
                    [state.orderBy]: state.order,
                },
                filterPayload
            )

            if (isNil(results)) {
                dispatch({
                    type: Actions.CHANGE_PAGE_RESULTS,
                    data: {
                        referrals: state.data,
                        total: state.total,
                        page: state.page,
                    },
                })
            }

            dispatch({
                type: Actions.CHANGE_PAGE_RESULTS,
                data: {
                    referrals: results.referralsList,
                    total: results.total,
                    page: value,
                },
            })
        },
        [filterPayload, state]
    )

    const handleRowPerPageChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: Actions.CHANGE_PER_PAGE_LOADING })

            const value: number = parseInt(event.target.value)

            const results = await getReferralsList(
                value,
                state.skip,
                {
                    [state.orderBy]: state.order,
                },
                filterPayload
            )

            if (isNil(results)) {
                dispatch({
                    type: Actions.CHANGE_PER_PAGE_RESULTS,
                    data: {
                        referrals: state.data,
                        total: state.total,
                        rowsPerPage: state.rowsPerPage,
                    },
                })
            }

            dispatch({
                type: Actions.CHANGE_PER_PAGE_RESULTS,
                data: {
                    referrals: results.referralsList,
                    total: results.total,
                    rowsPerPage: value,
                },
            })
        },
        [filterPayload, state]
    )

    useEffect(() => {
        ;(async () => {
            dispatch({ type: Actions.FETCH_REFERRALS_LOADING })
            const results = await getReferralsList(
                state.rowsPerPage,
                state.skip,
                {
                    [state.orderBy]: state.order,
                },
                filterPayload
            )
            dispatch({
                type: Actions.FETCH_REFERRALS_RESULTS,
                data: { referrals: results.referralsList, total: results.total },
            })
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterPayload])

    return (
        <>
            <TableContainer className={classNames(className)} component={'div'}>
                <List
                    headerData={REFERRALS_TABLE_HEAD}
                    orderBy={state.orderBy}
                    order={state.order}
                    handleSorting={() => undefined}
                    i18nNamespace='affiliates'
                    bodyData={state.data}
                    variant='referrals'
                    isLoading={state.loading}
                />
            </TableContainer>
            {state.data.length > 0 && (
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

Component.displayName = 'Tables:Affiliates.Referrals'

export default Component

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.FETCH_REFERRALS_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case Actions.FETCH_REFERRALS_RESULTS: {
            return {
                ...state,
                loading: false,
                data: action.data.referrals,
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
                data: action.data.referrals,
                total: action.data.total,
                page: action.data.page,
            }
        }
        case Actions.CHANGE_PER_PAGE_RESULTS: {
            return {
                ...state,
                loading: false,
                data: action.data.referrals,
                page: 0,
                rowsPerPage: action.data.rowsPerPage,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}
