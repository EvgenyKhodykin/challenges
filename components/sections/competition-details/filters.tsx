import { IconButton } from '@mui/material'
import classNames from 'classnames'
import BackArrowIcon from 'components/buttons/back.desktop'
import CompetitionsListIcon from 'components/icons/сhallengesList'
import { AnimatePresence, motion } from 'framer-motion'
import Competition from 'lib/competitions/competition.interface'
import getCompetitionsFront from 'lib/competitions/get-competitions.front'
import { LAYOUT_PRIVATE_WITH_SIDEBAR_FILTERS_TOGGLE_TIME } from 'lib/utils/utils.const'
import { map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useMemo, useReducer } from 'react'

import CloseButton from '../../buttons/close'
import Card, { Variant as CompetitionCardVariant } from '../../cards/competition/index'
import Skeleton from '../../skeletons/competition-details/sidebar'
import styles from './filters.module.scss'

export enum Actions {
    FETCHING_END,
}

export type Action = {
    type: Actions.FETCHING_END
    data: Array<Competition>
}

export interface State {
    competitionsList: Array<Competition>
    isFetching: boolean
}

export interface Props {
    isFilterOpened: boolean
    onToggleFilters: () => void
    id: string
}

const Component: React.FC<Props> = ({ isFilterOpened, onToggleFilters, id }: Props) => {
    const { t } = useTranslation('common')

    const [state, dispatch] = useReducer(reducer, {
        competitionsList: [],
        isFetching: true,
    })

    const duration = useMemo(
        () => LAYOUT_PRIVATE_WITH_SIDEBAR_FILTERS_TOGGLE_TIME / 2,
        []
    )

    const buttonsList = useMemo(
        () => (
            <motion.div
                key={'buttons'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
                className={classNames(styles.ButtonsList, {
                    [styles.ButtonListOpened]: isFilterOpened,
                })}
            >
                {isFilterOpened && (
                    <div className={styles.CloseButtonContainer}>
                        <CloseButton
                            onPress={onToggleFilters}
                            className={styles.CloseButtonIcon}
                        />
                    </div>
                )}
                <div className={styles.BackButtonContainer}>
                    <BackArrowIcon link='/competitions' />
                    {isFilterOpened && (
                        <span className={styles.Text}>{t('leaderboard')}</span>
                    )}
                </div>
                {!isFilterOpened && (
                    <IconButton onClick={onToggleFilters}>
                        <CompetitionsListIcon />
                    </IconButton>
                )}
            </motion.div>
        ),
        [onToggleFilters, isFilterOpened, t, duration]
    )

    const filteredPreviews = useMemo(
        () => [
            ...state.competitionsList.filter((item) => item.id === Number(id)),
            ...state.competitionsList.filter((item) => item.id !== Number(id)),
        ],
        [state.competitionsList, id]
    )

    const renderCompetitions = useCallback(
        (competition: Competition, key: number) => (
            <Card
                variant={competition.status as CompetitionCardVariant}
                data={competition}
                displayVariant='preview'
                key={key}
                className={classNames(styles.CompetitionPreview, {
                    [styles.Active]:
                        competition.id === Number(id) &&
                        competition.status !== 'upcoming',
                    [styles.Upcoming]: competition.status === 'upcoming',
                })}
                onPress={onToggleFilters}
            />
        ),
        [id, onToggleFilters]
    )

    const renderSkeleton = useCallback(
        (element: number) => (
            <Skeleton key={element} className={styles.CompetitionPreview} />
        ),
        []
    )

    useEffect(() => {
        ;(async () => {
            try {
                const competitions = await getCompetitionsFront()

                dispatch({
                    type: Actions.FETCHING_END,
                    data: competitions,
                })
            } catch (error) {
                dispatch({
                    type: Actions.FETCHING_END,
                    data: [],
                })
            }
        })()
    }, [])

    return (
        <AnimatePresence>
            {isFilterOpened && (
                <motion.div
                    key={'background'}
                    data-testid='drawer-container-profile-background'
                    className={styles.Background}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration }}
                    exit={{
                        opacity: 0,
                        transition: {
                            delay: 0.1,
                            duration: 0.3,
                            ease: 'linear',
                        },
                    }}
                />
            )}
            <motion.div
                key={'Root'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
                className={classNames(styles.Root, {
                    [styles.FilterOpened]: isFilterOpened,
                })}
            >
                {buttonsList}
                {isFilterOpened && (
                    <div className={styles.Wrapper}>
                        <div className={styles.PreviewList}>
                            {state.isFetching && map([1, 2, 3, 4, 5], renderSkeleton)}
                            {map(filteredPreviews, renderCompetitions)}
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}

Component.displayName = 'Sections:Competition-details:Filters'

export default Component

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.FETCHING_END: {
            return {
                ...state,
                isFetching: false,
                competitionsList: action.data,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}
