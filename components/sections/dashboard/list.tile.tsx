import type { Theme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { STAGE_TYPE } from 'lib/api/challenges/challenges.const'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'
import { Fragment, useCallback, useEffect, useMemo, useReducer } from 'react'
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
import type LayoutEventHandler from '../../../lib/utils/events/layout-handler.interface'
import { DASHBOARD_FILTERS_CHALLENGE_TYPE } from '../../../lib/utils/utils.const'
import Card, { Variant as CardVariant } from '../../cards/dashboard'
import CardPending, { Variant as CardPendingVariant } from '../../cards/dashboard/pending'
import InteractivityLoader from '../../interactivity/loader.infinite-scroll'
import styles from './list.tile.module.scss'

export enum Actions {
    UPDATE_PENDING,
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
          type: Actions.UPDATE_PENDING
          data: Array<Pending>
      }
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
        case Actions.UPDATE_PENDING: {
            return {
                ...state,
                pending: action.data,
            }
        }
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
    state: { data, amountVariant, statusFilter, isNewChallengeSnapped, filters },
    onLayout = () => undefined,
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

    const handlePendingComplete = useCallback(
        (login: number) => {
            const values = state.pending.reduce(
                (results: Array<Pending>, item: Pending) => {
                    if (item.login !== login) {
                        results.push(item)
                    }
                    return results
                },
                []
            )

            dispatch({ type: Actions.UPDATE_PENDING, data: values })
            // @todo add accounts refreshing
        },
        [state.pending]
    )

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

    const handleLayout = useCallback<LayoutEventHandler>(
        (node: HTMLDivElement | null) => {
            if (!node) {
                onLayout(undefined)
                return
            }

            onLayout({
                top: node.offsetTop,
                left: node.offsetLeft,
                width: node.clientWidth,
                height: node.clientHeight,
            })
        },
        [onLayout]
    )

    const renderPending = useCallback(
        (element: Pending, key: number) => (
            <Fragment key={key}>
                <CardPending
                    data={element}
                    variant={CardPendingVariant.TILE}
                    onComplete={handlePendingComplete}
                />
            </Fragment>
        ),
        [handlePendingComplete]
    )

    const renderAccount = useCallback(
        (element: Account, key: number) => (
            <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
                <Card
                    variant={
                        {
                            [ACCOUNTS_STATUS.FAILED]: CardVariant.TILE_FAILED,
                            [ACCOUNTS_STATUS.ONGOING]: CardVariant.TILE_ONGOING,
                            [ACCOUNTS_STATUS.PASSED]: CardVariant.TILE_PASSED,
                            [ACCOUNTS_STATUS.NEW]: CardVariant.TILE_CREATED,
                        }[element.status]
                    }
                    amountVariant={amountVariant}
                    data={element}
                />
            </Grid>
        ),
        [amountVariant]
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
            accounts = accounts.filter(
                (account) =>
                    status.includes(account.status) && account.type !== 'competition'
            )
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

    const newChallenge = useMemo<JSX.Element>(
        () => (
            <Grid
                item
                xs={12}
                md={6}
                lg={4}
                xl={3}
                className={styles.NewChallengeContainer}
            >
                <Card
                    className={classNames({
                        [styles.Snapped]: isNewChallengeSnapped,
                    })}
                    variant={CardVariant.TILE_NEW}
                />
            </Grid>
        ),
        [isNewChallengeSnapped]
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

    return (
        <InfiniteScroll
            dataLength={state.displayAccounts.data.length}
            next={handleFetch}
            hasMore={hasMore}
            loader={<InteractivityLoader />}
            scrollableTarget={scrollableTarget}
            className={classNames(styles.Root, className)}
        >
            <Grid
                container
                rowSpacing={{ xs: 2, md: 2 }}
                columnSpacing={{ xs: 0, md: 2 }}
                ref={handleLayout}
                key={'full-list'}
            >
                {isDesktop && (
                    <>
                        {newChallenge}
                        {map(state.pending, renderPending)}
                        {map(state.displayAccounts.data, renderAccount)}
                        {noResultsMessage}
                    </>
                )}
                {!isDesktop && (
                    <>
                        {noResultsMessage}
                        {newChallenge}
                        {map(state.pending, renderPending)}
                        {map(state.displayAccounts.data, renderAccount)}
                    </>
                )}
            </Grid>
        </InfiniteScroll>
    )
}

Component.displayName = 'Sections:Dashboard:List.tile'

export default Component
