/* eslint-disable react-hooks/exhaustive-deps */
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import type { Theme } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import times from 'lodash/times'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import { TRADING_DAYS_STATUS } from '../../../lib/challenges/challenges.const'
import type { TestIds as GraphTestIds } from '../../graphs/linear.dotted'
import LinearGraph from '../../graphs/linear.dotted'
import type { DAY } from '../../icons/calendar'
import CalendarIcon from '../../icons/calendar'
import Skeleton from '../../skeletons/challenge-details/graphs'
import Paper from '../../surfaces/paper'
import styles from './trading-days.module.scss'

export interface TestIds {
    root?: string
    graph?: GraphTestIds
}

export interface TradingDaysData {
    active: number
    minimum: number
    status: TRADING_DAYS_STATUS
}

export interface Props {
    isLoading: boolean
    data: TradingDaysData
    className?: string
    testIds?: TestIds
}

const Component: React.FC<Props> = ({
    className,
    testIds,
    data,
    isLoading,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const [collapsed, toggleCollapsed] = useCycle<number>(0, 1)

    const visible = useMemo(
        () =>
            data.minimum > 1
                ? times(data.minimum).map((val) => ++val)
                : [0, data.minimum],
        [data.minimum]
    )

    const current = useMemo(() => {
        if (data.active > data.minimum && data.minimum === 1) return 2
        if (data.active > data.minimum) return data.minimum
        return data.active
    }, [data])

    const labels = useMemo(() => {
        if (visible[1] === 1) {
            return {
                1: '0',
                2: '1',
            }
        }

        return visible.reduce((newObj: { [index: number]: string }, item: number) => {
            newObj[item] = String(item)
            return newObj
        }, {})
    }, [visible])

    const targetLabel = useMemo(
        () => `${t('target')} ${t('common:daysCount', { count: data.minimum })}`,
        [data.minimum, t]
    )

    const goalLabel = useMemo(() => {
        const goal = data.minimum - data.active
        if (goal <= 0) {
            return `${t('common:daysCount', { count: 0 })}`
        } else if (goal === 1) {
            return `${t('common:daysCount', { count: 1 })}`
        } else {
            return `${t('common:daysCount', { count: goal })}`
        }
    }, [data.minimum, data.active, t])

    return (
        <Paper
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'graphs-trading-days-root'}
        >
            {isDesktop && (
                <>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <>
                            <div className={styles.Top}>
                                <div className={styles.Title}>
                                    <span
                                        className={classNames(styles.Icon, {
                                            [styles.Success]:
                                                data.status ===
                                                TRADING_DAYS_STATUS.SUCCESS,
                                            [styles.Failure]:
                                                data.status ===
                                                TRADING_DAYS_STATUS.FAILURE,
                                        })}
                                    >
                                        <CalendarIcon
                                            day={data.minimum as DAY}
                                            className={styles.Calendar}
                                        />
                                    </span>
                                    <span className={styles.Text}>
                                        {t('tradingDays.title')}
                                    </span>
                                </div>
                                <span className={styles.Step}>
                                    <span>{data.active}/</span>
                                    <span>{data.minimum}</span>
                                </span>
                            </div>
                            <div className={styles.Middle}>
                                {data.active > 0 ? (
                                    <LinearGraph
                                        className={styles.Graph}
                                        steps={data.minimum > 1 ? data.minimum : 2}
                                        visible={visible}
                                        current={current}
                                        labels={labels}
                                        testIds={testIds?.graph}
                                        mode={'dark'}
                                    />
                                ) : (
                                    <div className={styles.NoTrades}>
                                        <span className={styles.Logo} />
                                        <p>{t('tradingDays.noTradesYet')}</p>
                                    </div>
                                )}
                            </div>
                            <div className={styles.Bottom}>
                                <span className={styles.EndDate}>
                                    {t('toGoal')}&nbsp;
                                    <span>{goalLabel}</span>
                                </span>
                                <span className={styles.TimeFrame}>{targetLabel}</span>
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
                                <Skeleton isDesktop={false} />
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
                                            <div className={styles.Title}>
                                                <span
                                                    className={classNames(styles.Icon, {
                                                        [styles.Success]:
                                                            data.status ===
                                                            TRADING_DAYS_STATUS.SUCCESS,
                                                        [styles.Failure]:
                                                            data.status ===
                                                            TRADING_DAYS_STATUS.FAILURE,
                                                    })}
                                                >
                                                    <CalendarIcon
                                                        day={data.minimum as DAY}
                                                        className={styles.Calendar}
                                                    />
                                                </span>
                                                <span className={styles.Text}>
                                                    {t('tradingDays.title')}
                                                </span>
                                            </div>
                                            <ExpandMoreIcon className={styles.Expand} />
                                        </div>
                                        <div className={styles.Body}>
                                            {data.active > 0 ? (
                                                <LinearGraph
                                                    className={styles.Graph}
                                                    steps={
                                                        data.minimum > 1
                                                            ? data.minimum
                                                            : 2
                                                    }
                                                    visible={visible}
                                                    current={current}
                                                    labels={labels}
                                                    testIds={testIds?.graph}
                                                    mode={'dark'}
                                                />
                                            ) : (
                                                <div className={styles.NoTrades}>
                                                    <br />
                                                    <span className={styles.Logo} />
                                                    <p>{t('tradingDays.noTradesYet')}</p>
                                                </div>
                                            )}
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
                                height: 165,
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
                                <div className={styles.Title}>
                                    <span
                                        className={classNames(styles.Icon, {
                                            [styles.Success]:
                                                data.status ===
                                                TRADING_DAYS_STATUS.SUCCESS,
                                            [styles.Failure]:
                                                data.status ===
                                                TRADING_DAYS_STATUS.FAILURE,
                                        })}
                                    >
                                        <CalendarIcon
                                            day={data.minimum as DAY}
                                            className={styles.Calendar}
                                        />
                                    </span>
                                    <span className={styles.Text}>
                                        {t('tradingDays.title')}
                                    </span>
                                </div>
                                <span className={styles.Step}>
                                    <span>{data.active}/</span>
                                    <span>{data.minimum}</span>
                                </span>
                            </div>
                            <div className={styles.Middle}>
                                {data.active > 0 ? (
                                    <LinearGraph
                                        className={styles.Graph}
                                        steps={data.minimum > 1 ? data.minimum : 2}
                                        visible={visible}
                                        current={current}
                                        labels={labels}
                                        testIds={testIds?.graph}
                                        mode={'dark'}
                                    />
                                ) : (
                                    <div className={styles.NoTrades}>
                                        <span className={styles.Logo} />
                                        <p>{t('tradingDays.noTradesYet')}</p>
                                    </div>
                                )}
                            </div>
                            <div className={styles.Bottom}>
                                <span className={styles.EndDate}>
                                    {t('toGoal')}&nbsp;
                                    <span>{goalLabel}</span>
                                </span>
                                <span className={styles.TimeFrame}>{targetLabel}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </Paper>
    )
}

Component.displayName = 'Graphs:TradingDays'

export default Component
