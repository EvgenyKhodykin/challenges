import 'moment/min/locales'

import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import type { Theme } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { ACCOUNTS_STATUS } from 'lib/accounts/accounts.const'
import Challenge from 'lib/challenges/challenge.interface'
import { durationBetweenDates } from 'lib/utils/time'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import Skeleton from '../skeletons/challenge-details/graphs'
import Paper from '../surfaces/paper'
import type { TestIds as GraphTestIds } from './linear.dotted'
import LinearGraph from './linear.dotted'
import styles from './step.module.scss'

export interface TestIds {
    root?: string
    graph?: GraphTestIds
}

export interface Props {
    challenge: Challenge
    isLoading: boolean
    className?: string
    testIds?: TestIds
}

const Component: React.FC<Props> = ({
    challenge,
    isLoading,
    className,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const router = useRouter()
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const [collapsed, toggleCollapsed] = useCycle<number>(0, 1)
    const duration = moment(challenge.endDate).diff(moment(challenge.startDate), 'days')
    const timer = durationBetweenDates(challenge.endDate)

    const displayedDate = useMemo(() => {
        if ([ACCOUNTS_STATUS.PASSED, ACCOUNTS_STATUS.FAILED].includes(challenge.status)) {
            if (moment().isAfter(challenge.endDate)) {
                return (
                    <span className={styles.EndDate}>
                        {t('common:endedOn')}:{' '}
                        <span>
                            {moment(challenge.endDate)
                                .locale(router.locale as string)
                                .format('ll')}
                        </span>
                    </span>
                )
            }
            return (
                <>
                    <span className={styles.EndDate}>
                        {t('common:endsIn')}: <span>{timer}</span>
                    </span>
                </>
            )
        }
    }, [challenge, router, timer, t])

    const labels = useMemo(() => {
        if (challenge.stageNumber < 1) {
            return {
                1: `${t('timeline.start')}`,
                2: `${t('timeline.end')}`,
            }
        }
        if (challenge.stageNumber === 1) {
            return {
                1: `${t('timeline.step', { count: 1 })}`,
                2: `${t('timeline.step', { count: 2 })}`,
            }
        }
        return {
            1: `${t('timeline.step', { count: 1 })}`,
            2: `${t('timeline.step', { count: 2 })}`,
            3: `${t('timeline.step', { count: 3 })}`,
        }
    }, [challenge, t])

    return (
        <Paper
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'graphs-step-root'}
        >
            {isDesktop && (
                <>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <>
                            <div className={styles.Top}>
                                <span className={styles.Label}>
                                    {challenge.stageNumber > 0
                                        ? t('timeline.step', {
                                              count: challenge.stageNumber,
                                          })
                                        : t('common:daysCount', { count: duration })}
                                </span>
                                <>
                                    <span className={styles.Period}>
                                        {challenge.stageNumber > 0 &&
                                            t('common:daysCount', { count: duration })}
                                    </span>
                                    {challenge.stageNumber > 0 && (
                                        <span className={styles.Step}>
                                            <span>{challenge.stageNumber}/</span>
                                            <span>
                                                {challenge.stageNumber > 1 ? 3 : 2}
                                            </span>
                                        </span>
                                    )}
                                </>
                            </div>
                            <div className={styles.Middle}>
                                <LinearGraph
                                    className={classNames(styles.Graph, {
                                        [styles.Invisible]: challenge.stageNumber < 1,
                                    })}
                                    steps={challenge.stageNumber > 1 ? 3 : 2}
                                    visible={[1, 2, 3]}
                                    current={
                                        challenge.stageNumber > 0
                                            ? challenge.stageNumber
                                            : 1
                                    }
                                    labels={labels}
                                    testIds={testIds?.graph}
                                />
                            </div>
                            <div className={styles.Bottom}>
                                {displayedDate}
                                <span className={styles.TimeFrame}>
                                    {moment(challenge.startDate)
                                        .locale(router.locale as string)
                                        .format('ll')}
                                    &nbsp;&middot;&nbsp;
                                    {moment(challenge.endDate)
                                        .locale(router.locale as string)
                                        .format('ll')}
                                </span>
                            </div>
                        </>
                    )}
                </>
            )}
            {!isDesktop && (
                <AnimatePresence initial={false} mode='wait'>
                    {!collapsed && (
                        <>
                            {isLoading ? (
                                <Skeleton isStep isDesktop={false} />
                            ) : (
                                <motion.div
                                    key={'preview'}
                                    initial={{
                                        opacity: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            ease: 'easeInOut',
                                            duration: 0.3,
                                        },
                                    }}
                                >
                                    <ButtonBase
                                        focusRipple
                                        onClick={() => toggleCollapsed()}
                                        className={styles.Preview}
                                    >
                                        <div className={styles.Heading}>
                                            <span className={styles.Label}>
                                                {challenge.stageNumber > 0
                                                    ? t('timeline.step', {
                                                          count: challenge.stageNumber,
                                                      })
                                                    : t('common:daysCount', {
                                                          count: duration,
                                                      })}
                                            </span>
                                            <ExpandMoreIcon className={styles.Expand} />
                                        </div>
                                        <div className={styles.Body}>
                                            {displayedDate}
                                            <p className={styles.TimeFrame}>
                                                {moment(challenge.startDate)
                                                    .locale(router.locale as string)
                                                    .format('ll')}
                                                &nbsp;&middot;&nbsp;
                                                {moment(challenge.endDate)
                                                    .locale(router.locale as string)
                                                    .format('ll')}
                                            </p>
                                        </div>
                                    </ButtonBase>
                                </motion.div>
                            )}
                        </>
                    )}
                    {!!collapsed && (
                        <motion.div
                            key={'detailed'}
                            initial={{
                                opacity: 0,
                                height: 151,
                            }}
                            animate={{
                                opacity: 1,
                                height: 240,
                            }}
                            transition={{
                                ease: 'easeInOut',
                                height: {
                                    duration: 0.4,
                                },
                                opacity: {
                                    delay: 0.2,
                                    duration: 0.3,
                                },
                            }}
                            className={styles.Details}
                        >
                            <div className={styles.Top}>
                                <span className={styles.Label}>
                                    {challenge.stageNumber > 0
                                        ? t('timeline.step', {
                                              count: challenge.stageNumber,
                                          })
                                        : t('common:daysCount', {
                                              count: duration,
                                          })}
                                </span>
                                <span className={styles.Period}>
                                    {challenge.stageNumber > 0 &&
                                        t('common:daysCount', { count: duration })}
                                </span>
                                {challenge.stageNumber > 0 && (
                                    <span className={styles.Step}>
                                        <span>{challenge.stageNumber}/</span>
                                        <span> {challenge.stageNumber > 1 ? 3 : 2}</span>
                                    </span>
                                )}
                            </div>
                            <div className={styles.Middle}>
                                <LinearGraph
                                    className={styles.Graph}
                                    steps={challenge.stageNumber > 1 ? 3 : 2}
                                    visible={[1, 2, 3]}
                                    current={
                                        challenge.stageNumber > 0
                                            ? challenge.stageNumber
                                            : 1
                                    }
                                    labels={labels}
                                    testIds={testIds?.graph}
                                />
                            </div>
                            <div className={styles.Bottom}>
                                {displayedDate}
                                <span className={styles.TimeFrame}>
                                    {moment(challenge.startDate)
                                        .locale(router.locale as string)
                                        .format('ll')}
                                    &nbsp;&middot;&nbsp;
                                    {moment(challenge.endDate)
                                        .locale(router.locale as string)
                                        .format('ll')}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </Paper>
    )
}

Component.displayName = 'Graphs:Step'

export default Component
