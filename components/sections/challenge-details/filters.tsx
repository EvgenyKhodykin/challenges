import { IconButton } from '@mui/material'
import classNames from 'classnames'
import BackArrowIcon from 'components/buttons/back.desktop'
import NewChallengeIcon from 'components/icons/newChallenge'
import ChallengesListIcon from 'components/icons/сhallengesList'
import { AnimatePresence, motion } from 'framer-motion'
import Account from 'lib/accounts/account.interface'
import { ACCOUNTS_STATUS } from 'lib/accounts/accounts.const'
import accountsFront from 'lib/accounts/accounts.front'
import type AccountsResults from 'lib/accounts/accounts-results.interface'
import { LAYOUT_PRIVATE_WITH_SIDEBAR_FILTERS_TOGGLE_TIME } from 'lib/utils/utils.const'
import { map } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useMemo, useReducer } from 'react'

import CloseButton from '../../buttons/close'
import Card, { Variant as CardVariant } from '../../cards/challenge-details/index'
import Skeleton from '../../skeletons/challenge-details/sidebar'
import styles from './filters.module.scss'

export enum Actions {
    FETCHING_END,
}

export type Action = {
    type: Actions.FETCHING_END
    data: AccountsResults
}

export interface State {
    challengesList: AccountsResults
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
        challengesList: {
            data: [],
            total: 0,
        },
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
                    <BackArrowIcon link='/dashboard' />
                    {isFilterOpened && (
                        <span className={styles.Text}>{t('dashboard')}</span>
                    )}
                </div>
                {!isFilterOpened && (
                    <>
                        <IconButton onClick={onToggleFilters}>
                            <NewChallengeIcon />
                        </IconButton>
                        <IconButton onClick={onToggleFilters} className={styles.ListIcon}>
                            <ChallengesListIcon />
                        </IconButton>
                    </>
                )}
            </motion.div>
        ),
        [onToggleFilters, isFilterOpened, t, duration]
    )

    const newChallengePreview = useMemo<JSX.Element>(
        () => (
            <Card
                variant={CardVariant.PREVIEW_NEW}
                className={styles.New}
                displayVariant='preview'
                onPress={onToggleFilters}
            />
        ),
        [onToggleFilters]
    )

    const filteredPreviews = useMemo(
        () => [
            ...state.challengesList.data.filter((item) => item.id === id),
            ...state.challengesList.data.filter((item) => item.id !== id),
        ],
        [id, state.challengesList]
    )

    const renderAccount = useCallback(
        (element: Account, key: number) => (
            <Card
                variant={
                    {
                        [ACCOUNTS_STATUS.FAILED]: CardVariant.PREVIEW_FAILED,
                        [ACCOUNTS_STATUS.ONGOING]: CardVariant.PREVIEW_ONGOING,
                        [ACCOUNTS_STATUS.PASSED]: CardVariant.PREVIEW_PASSED,
                        [ACCOUNTS_STATUS.NEW]: CardVariant.PREVIEW_CREATED,
                    }[element.status]
                }
                data={element}
                className={classNames(styles.ChallengePreview, {
                    [styles.Active]: element.id === id,
                })}
                key={key}
                displayVariant='preview'
                onPress={onToggleFilters}
            />
        ),
        [id, onToggleFilters]
    )

    const renderSkeleton = useCallback(
        (element: number) => (
            <Skeleton key={element} className={styles.ChallengePreview} />
        ),
        []
    )

    useEffect(() => {
        ;(async () => {
            try {
                const results = await accountsFront()

                dispatch({
                    type: Actions.FETCHING_END,
                    data: results,
                })
            } catch (error) {
                dispatch({
                    type: Actions.FETCHING_END,
                    data: {
                        data: [],
                        total: 0,
                    },
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
                        {newChallengePreview}
                        <div className={styles.PreviewList}>
                            {state.isFetching && map([1, 2, 3, 4, 5], renderSkeleton)}
                            {map(filteredPreviews, renderAccount)}
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}

Component.displayName = 'Sections:Challenge-details:Filters'

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
                challengesList: {
                    data: action.data.data,
                    total: action.data.total,
                },
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}
