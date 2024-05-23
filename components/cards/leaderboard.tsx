/* eslint-disable react-hooks/exhaustive-deps */
import type { Theme } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import classNames from 'classnames'
import { DEFAULT_LIMIT, DEFAULT_SKIP } from 'lib/leaders/leaders.const'
import isNil from 'lodash/isNil'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import type Leader from '../../lib/leaders/leader.interface'
import Amount from '../amount/amount'
import AwardBadge from '../badges/award'
import RankChangeBadge from '../badges/rank-change'
import ChevronRightIcon from '../icons/chevron-right'
import InteractivityLoader from '../interactivity/loader.infinite-scroll'
import styles from './leaderboard.module.scss'

export interface TestIds {
    root?: string
}

export interface Props {
    leaders: Array<Leader>
    className?: string
    testIds?: TestIds
}

export enum Actions {
    UPDATE_DISPLAY,
    UPDATE_RAW,
}

export interface State {
    display: Array<Leader>
    raw: Array<Leader>
}

export type Action =
    | {
          type: Actions.UPDATE_DISPLAY
          data: Array<Leader>
      }
    | {
          type: Actions.UPDATE_RAW
          data: {
              raw: Array<Leader>
              display: Array<Leader>
          }
      }

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.UPDATE_DISPLAY: {
            return {
                ...state,
                display: action.data,
            }
        }
        case Actions.UPDATE_RAW: {
            return {
                ...state,
                display: action.data.display,
                raw: action.data.raw,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}

const Leaderboard: React.FC<Props> = ({
    leaders,
    className,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation('leaderboard')

    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
        raw: leaders,
        display: leaders.slice(DEFAULT_SKIP, DEFAULT_LIMIT),
    })

    const scrollableTarget = useMemo(
        () => (isDesktop ? 'scrollable-content-desktop' : 'scrollable-content-mobile'),
        [isDesktop]
    )

    const handleFetch = useCallback(async () => {
        const limit = DEFAULT_LIMIT
        const skip = state.display.length
        const data = state.raw.slice(skip, limit + skip)

        dispatch({
            type: Actions.UPDATE_DISPLAY,
            data: [...state.display, ...data],
        })
    }, [state])

    const hasMore = useMemo(() => state.display.length < state.raw.length, [state])

    useEffect(() => {
        dispatch({
            type: Actions.UPDATE_RAW,
            data: {
                raw: leaders,
                display: leaders.slice(DEFAULT_SKIP, DEFAULT_LIMIT),
            },
        })
    }, [leaders])

    if (isNil(leaders)) {
        return <></>
    }
    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'leaderboard'}
        >
            <Grid container spacing={0} className={styles.Container}>
                <Grid item xs={6} md={4} className={styles.TH}>
                    <div className={styles.HeadingNumber}>#</div>
                    <div className={styles.HeadingName}>{t('table.headers.name')}</div>
                </Grid>
                <Grid item xs={3} md={2} className={styles.TH}>
                    {t('table.headers.account')}
                </Grid>
                <Grid
                    item
                    sx={{ display: { xs: 'none', md: 'block' } }}
                    md={2}
                    className={styles.TH}
                >
                    {t('table.headers.profit')}
                </Grid>
                <Grid
                    item
                    sx={{ display: { xs: 'none', md: 'block' } }}
                    md={2}
                    className={styles.TH}
                >
                    {t('table.headers.equity')}
                </Grid>
                <Grid item xs={3} md={2} className={styles.TH}>
                    {t('table.headers.gain')}
                </Grid>
            </Grid>
            <InfiniteScroll
                dataLength={state.display.length}
                next={handleFetch}
                hasMore={hasMore}
                loader={<InteractivityLoader />}
                scrollableTarget={scrollableTarget}
                className={classNames(styles.Root, className)}
            >
                {state.display.map((leader: Leader, index: number) => (
                    <Grid
                        key={index}
                        container
                        spacing={0}
                        className={classNames(styles.Container, styles.LineItem)}
                    >
                        <Grid
                            item
                            xs={6}
                            md={4}
                            className={classNames(styles.TD, styles.Rank)}
                        >
                            <div className={styles.RankChangeBadge}>
                                <RankChangeBadge delta={0} />
                            </div>
                            <div className={styles.RankNumber}>{leader.rank}</div>
                            <div className={styles.RankBadge}>
                                <AwardBadge rank={leader.rank} />
                            </div>
                            <div className={styles.leaderName}>{leader.shortName}</div>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            md={2}
                            className={classNames(styles.TD, styles.Account)}
                        >
                            <Amount
                                amount={leader.initialBalance}
                                kilo={true}
                                superscript={true}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{ display: { xs: 'none', md: 'block' } }}
                            md={2}
                            className={classNames(styles.TD, styles.Profit)}
                        >
                            <Amount amount={leader.profit} superscript={true} />
                        </Grid>
                        <Grid
                            item
                            sx={{ display: { xs: 'none', md: 'block' } }}
                            md={2}
                            className={classNames(styles.TD, styles.Equity)}
                        >
                            <Amount amount={leader.currentEquity} superscript={true} />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            md={2}
                            className={classNames(styles.TD, styles.Gain)}
                        >
                            <div className={styles.GainPercent}>
                                {leader.percentReturn.toFixed(2)}%
                            </div>
                            <div className={styles.ArrowForward}>
                                <ChevronRightIcon className={styles.ArrowRightIcon} />
                            </div>
                        </Grid>
                    </Grid>
                ))}
            </InfiniteScroll>
        </div>
    )
}

Leaderboard.displayName = 'Leaderboard'

export default Leaderboard
