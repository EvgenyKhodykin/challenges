import type { Theme } from '@mui/material'
import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import classNames from 'classnames'
import Competition from 'lib/competitions/competition.interface'
import map from 'lodash/map'
import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../../lib/competitions/competitions.const'
import type Props from '../../../lib/pages/competitions-list/list-props.interface'
import type { Variant as CompetitionCardVariant } from '../../cards/competition'
import CompetitionCard from '../../cards/competition'
import InteractivityLoader from '../../interactivity/loader.infinite-scroll'
import styles from './list.tile.module.scss'

export enum Actions {
    UPDATE_DISPLAY,
    UPDATE_RAW,
}

export interface State {
    display: Array<Competition>
    raw: Array<Competition>
}

export type Action =
    | {
          type: Actions.UPDATE_DISPLAY
          data: Array<Competition>
      }
    | {
          type: Actions.UPDATE_RAW
          data: {
              raw: Array<Competition>
              display: Array<Competition>
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

const Component: React.FC<Props> = ({ state: { filtered }, className }) => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
        raw: filtered,
        display: filtered.slice(DEFAULT_SKIP, DEFAULT_LIMIT),
    })

    const handleFetch = useCallback(async () => {
        const limit = DEFAULT_LIMIT
        const skip = state.display.length
        const data = state.raw.slice(skip, limit + skip)

        dispatch({
            type: Actions.UPDATE_DISPLAY,
            data: [...state.display, ...data],
        })
    }, [state])

    const scrollableTarget = useMemo(
        () => (isDesktop ? 'scrollable-content-desktop' : 'scrollable-content-mobile'),
        [isDesktop]
    )

    const hasMore = useMemo(() => state.display.length < state.raw.length, [state])

    const renderCompetitions = useCallback(
        (competition: Competition, key: number) => (
            <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
                <CompetitionCard
                    variant={competition.status as CompetitionCardVariant}
                    data={competition}
                    displayVariant='card'
                />
            </Grid>
        ),
        []
    )

    useEffect(() => {
        dispatch({
            type: Actions.UPDATE_RAW,
            data: {
                raw: filtered,
                display: filtered.slice(DEFAULT_SKIP, DEFAULT_LIMIT),
            },
        })
    }, [filtered])

    return (
        <InfiniteScroll
            dataLength={state.display.length}
            next={handleFetch}
            hasMore={hasMore}
            loader={<InteractivityLoader />}
            scrollableTarget={scrollableTarget}
            className={classNames(styles.Root, className)}
        >
            <Grid
                rowSpacing={{ xs: 2, md: 2 }}
                columnSpacing={{ xs: 0, md: 2 }}
                container
                key={'full-list'}
            >
                {map(state.display, renderCompetitions)}
            </Grid>
        </InfiniteScroll>
    )
}

Component.displayName = 'Lists:Competitions:Tile'

export default Component
