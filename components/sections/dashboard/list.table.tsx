import type { Theme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { STAGE_TYPE } from 'lib/api/challenges/challenges.const'
import { DASHBOARD_FILTERS_CHALLENGE_TYPE } from 'lib/utils/utils.const'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import type Account from '../../../lib/accounts/account.interface'
import {
    ACCOUNTS_STATUS,
    DEFAULT_LIMIT,
    DEFAULT_SKIP,
} from '../../../lib/accounts/accounts.const'
import type AccountsResults from '../../../lib/accounts/accounts-results.interface'
import { DASHBOARD_STATUSES } from '../../../lib/challenges/challenges.const'
import type Pending from '../../../lib/challenges/pending.interface'
import type Props from '../../../lib/pages/dashboard/list-props.interface'
import Card, { Variant as CardVariant } from '../../cards/dashboard'
import InteractivityLoader from '../../interactivity/loader.infinite-scroll'
import styles from './list.table.module.scss'

export enum Actions {
    UPDATE_ACCOUNTS_DISPLAY,
    UPDATE_ACCOUNTS_RAW,
}

export interface State {
    pending: Array<Pending>
    displayAccounts: AccountsResults
    rawAccounts: AccountsResults
}

export type Action =
    | {
          type: Actions.UPDATE_ACCOUNTS_DISPLAY
          data: AccountsResults
      }
    | {
          type: Actions.UPDATE_ACCOUNTS_RAW
          data: {
              rawAccounts: AccountsResults
              displayAccounts: AccountsResults
          }
      }

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.UPDATE_ACCOUNTS_DISPLAY: {
            return {
                ...state,
                displayAccounts: action.data,
            }
        }
        case Actions.UPDATE_ACCOUNTS_RAW: {
            return {
                ...state,
                ...action.data,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}

const Component: React.FC<Props> = ({
    className,
    state: { data, amountVariant, statusFilter, filters },
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const { t } = useTranslation('dashboard')

    const [state, dispatch] = useReducer(reducer, {
        pending: data.pendingData,
        rawAccounts: data.accounts,
        displayAccounts: {
            data: data.accounts.data.slice(DEFAULT_SKIP, DEFAULT_LIMIT - 1),
            total: data.accounts.total,
            skip: DEFAULT_SKIP,
            limit: DEFAULT_LIMIT,
        },
    })

    const scrollableTarget = useMemo(
        () => (isDesktop ? 'scrollable-content-desktop' : 'scrollable-content-mobile'),
        [isDesktop]
    )

    const hasMore = useMemo(() => {
        const { data, total } = state.displayAccounts

        return data.length < total
    }, [state.displayAccounts])

    const handleFetch = useCallback(async () => {
        const limit = (state.displayAccounts.limit ?? DEFAULT_LIMIT - 1) + DEFAULT_LIMIT
        const skip = (state.displayAccounts.skip ?? DEFAULT_SKIP) + DEFAULT_LIMIT

        const data = state.rawAccounts.data.slice(skip, limit)

        dispatch({
            type: Actions.UPDATE_ACCOUNTS_DISPLAY,
            data: {
                total: state.rawAccounts.total,
                data: [...state.displayAccounts.data, ...data],
                limit,
                skip,
            },
        })
    }, [state.rawAccounts, state.displayAccounts])

    const renderAccount = useCallback(
        (element: Account, key: number) => (
            <Grid key={key} item xs={12}>
                <Card
                    variant={
                        {
                            [ACCOUNTS_STATUS.FAILED]: CardVariant.TABLE_FAILED,
                            [ACCOUNTS_STATUS.ONGOING]: CardVariant.TABLE_ONGOING,
                            [ACCOUNTS_STATUS.PASSED]: CardVariant.TABLE_PASSED,
                            [ACCOUNTS_STATUS.NEW]: CardVariant.TABLE_CREATED,
                        }[element.status]
                    }
                    data={element}
                    amountVariant={amountVariant}
                    isTile={false}
                />
            </Grid>
        ),
        [amountVariant]
    )

    const noResultsMessage = useMemo(
        () =>
            isEmpty(state.displayAccounts.data) ? (
                <div className={styles.NoResults}>
                    <h3>
                        {t('noResultsMessage', {
                            status: t(`filters.status.${statusFilter}`).toLowerCase(),
                        })}
                    </h3>
                </div>
            ) : null,
        [state.displayAccounts.data, t, statusFilter]
    )

    useEffect(() => {
        const status: Array<ACCOUNTS_STATUS> = {
            [DASHBOARD_STATUSES.ACTIVE]: [ACCOUNTS_STATUS.ONGOING],
            [DASHBOARD_STATUSES.PAST]: [ACCOUNTS_STATUS.FAILED, ACCOUNTS_STATUS.PASSED],
        }[
            statusFilter as Exclude<
                DASHBOARD_STATUSES,
                DASHBOARD_STATUSES.ALL | DASHBOARD_STATUSES.FUNDED
            >
        ]

        let accounts = [...data.accounts.data]

        if (Array.isArray(status) && status.length) {
            accounts = accounts.filter((account) => status.includes(account.status))
        } else if (!Array.isArray(status) && statusFilter === DASHBOARD_STATUSES.FUNDED) {
            accounts = accounts.filter(
                (account) =>
                    account.type !== 'competition' &&
                    account.stageType === STAGE_TYPE.LIVE
            )
        }

        if (filters.type.length) {
            accounts = accounts.filter((account) => {
                const isCompetition =
                    account.type === 'competition' &&
                    filters.type.includes(DASHBOARD_FILTERS_CHALLENGE_TYPE.COMPETITION)

                return isCompetition
            })
        }

        dispatch({
            type: Actions.UPDATE_ACCOUNTS_RAW,
            data: {
                rawAccounts: {
                    data: accounts,
                    total: accounts.length,
                },
                displayAccounts: {
                    data: accounts.slice(DEFAULT_SKIP, DEFAULT_LIMIT - 1),
                    total: accounts.length,
                    skip: DEFAULT_SKIP,
                    limit: DEFAULT_LIMIT,
                },
            },
        })
    }, [data, statusFilter, filters])

    return (
        <InfiniteScroll
            dataLength={state.displayAccounts.data.length}
            next={handleFetch}
            hasMore={hasMore}
            loader={<InteractivityLoader />}
            scrollableTarget={scrollableTarget}
            className={classNames(styles.Root, className)}
        >
            <Grid container rowSpacing={{ xs: 2, md: 2 }}>
                <Grid item xs={12}>
                    <Card variant={CardVariant.TABLE_NEW} />
                </Grid>
                {map(state.displayAccounts.data, renderAccount)}
                {noResultsMessage}
            </Grid>
        </InfiniteScroll>
    )
}

Component.displayName = 'Sections:Dashboard:List.table'

export default Component
