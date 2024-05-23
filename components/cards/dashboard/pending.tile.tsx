/* eslint-disable react-hooks/exhaustive-deps */
import IconCheck from '@mui/icons-material/Check'
import IconBullet from '@mui/icons-material/FiberManualRecordRounded'
import Grid from '@mui/material/Grid'
import classNames from 'classnames'
import find from 'lodash/find'
import partial from 'lodash/partial'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'

import { PENDING_CHALLENGE_SETUP_TIME } from '../../../lib/challenges/challenges.const'
import pendingFront from '../../../lib/challenges/pending.front'
import master from './dashboard.module.scss'
import variant from './pending.tile.module.scss'
import type Props from './pending-props.interface'

export enum Actions {
    TIMER_FETCHING_START,
    TIMER_FETCHING_END,
    CHECK_FIRST_BULLET,
    CHECK_SECOND_BULLET,
    CHECK_THIRD_BULLET,
    HIDE_TIMER,
    SHOW_OVERTIME,
    OVERTIME_FETCHING_START,
    OVERTIME_FETCHING_END,
}

export interface State {
    isFetching: boolean
    isTimerFetched: boolean
    existing: boolean
    bullets: Array<boolean>
    isTimerShown: boolean
    isOvertimeMessageShown: boolean
}

export type Action =
    | { type: Actions.TIMER_FETCHING_START }
    | {
          type: Actions.TIMER_FETCHING_END
          data: boolean
      }
    | { type: Actions.CHECK_FIRST_BULLET }
    | { type: Actions.CHECK_SECOND_BULLET }
    | { type: Actions.CHECK_THIRD_BULLET }
    | { type: Actions.HIDE_TIMER }
    | { type: Actions.SHOW_OVERTIME }
    | { type: Actions.OVERTIME_FETCHING_START }
    | {
          type: Actions.OVERTIME_FETCHING_END
          data: boolean
      }

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.TIMER_FETCHING_START: {
            return {
                ...state,
                isFetching: true,
                isTimerFetched: true,
            }
        }
        case Actions.TIMER_FETCHING_END: {
            return {
                ...state,
                isFetching: false,
                existing: action.data,
            }
        }
        case Actions.OVERTIME_FETCHING_START: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case Actions.OVERTIME_FETCHING_END: {
            return {
                ...state,
                isFetching: false,
                existing: action.data,
            }
        }
        case Actions.CHECK_FIRST_BULLET: {
            const bullets = [...state.bullets]
            bullets[0] = true
            return {
                ...state,
                bullets,
            }
        }
        case Actions.CHECK_SECOND_BULLET: {
            const bullets = [...state.bullets]
            bullets[1] = true
            return {
                ...state,
                bullets,
            }
        }
        case Actions.CHECK_THIRD_BULLET: {
            const bullets = [...state.bullets]
            bullets[2] = true
            return {
                ...state,
                bullets,
            }
        }
        case Actions.HIDE_TIMER: {
            return {
                ...state,
                isTimerShown: false,
            }
        }
        case Actions.SHOW_OVERTIME: {
            return {
                ...state,
                isOvertimeMessageShown: true,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}

const Component: React.FC<Props> = ({
    data,
    className,
    onComplete,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')
    const timerOneThird = Math.floor((PENDING_CHALLENGE_SETUP_TIME / 3) * 1)
    const timerTwoThird = Math.floor((PENDING_CHALLENGE_SETUP_TIME / 3) * 2)
    const [state, dispatch] = useReducer(reducer, {
        isFetching: false,
        existing: true,
        isTimerFetched: false,
        bullets: [
            moment().unix() - data.createdAt >= timerOneThird,
            moment().unix() - data.createdAt >= timerTwoThird,
            false,
        ],
        isTimerShown: data.createdAt + PENDING_CHALLENGE_SETUP_TIME >= moment().unix(),
        isOvertimeMessageShown:
            data.createdAt + PENDING_CHALLENGE_SETUP_TIME < moment().unix(),
    })

    const currentTimerValue = useRef<number>(moment().unix() - data.createdAt)

    const bulletTop = useMemo(() => {
        if (state.bullets[0]) {
            return <IconCheck className={variant.Check} />
        }
        return <IconBullet className={variant.Dot} />
    }, [state.bullets])
    const bulletMedium = useMemo(() => {
        if (state.bullets[1]) {
            return <IconCheck className={variant.Check} />
        }
        return <IconBullet className={variant.Dot} />
    }, [state.bullets])
    const bulletBottom = useMemo(() => {
        if (state.bullets[2]) {
            return <IconCheck className={variant.Check} />
        }
        return <IconBullet className={variant.Dot} />
    }, [state.bullets])
    const first = useRef<SVGCircleElement>(null)
    const last = useRef<SVGCircleElement>(null)
    const text = useRef<SVGTextElement>(null)

    const calculateDashArray = useCallback((i: number) => {
        const k = (i / PENDING_CHALLENGE_SETUP_TIME) * 100
        const l = 100 - k
        return [k, l]
    }, [])

    const handleTimerFetching = useCallback(async () => {
        dispatch({ type: Actions.TIMER_FETCHING_START })

        const results = await pendingFront()
        // console.log('--> handleTimerFetching results', results)
        const existing = !!find(results.data, { login: data.login })

        dispatch({ type: Actions.TIMER_FETCHING_END, data: existing })
    }, [data, dispatch])

    const handleOnComplete = useCallback(() => {
        if (!state.bullets[2]) {
            dispatch({ type: Actions.CHECK_THIRD_BULLET })
        }

        if (state.isTimerShown) {
            dispatch({ type: Actions.HIDE_TIMER })
        }

        setTimeout(partial(onComplete, data.login), 3000)
    }, [onComplete, data, state])

    const handleOvertimeWaiting = useCallback(async () => {
        if (state.isTimerShown) {
            dispatch({ type: Actions.HIDE_TIMER })
        }

        if (!state.isOvertimeMessageShown) {
            dispatch({ type: Actions.SHOW_OVERTIME })
        }

        dispatch({ type: Actions.OVERTIME_FETCHING_START })

        const results = await pendingFront()
        // console.log('--> handleOvertimeWaiting results', results)
        const existing = !!find(results.data, { login: data.login })

        dispatch({ type: Actions.OVERTIME_FETCHING_END, data: existing })

        setTimeout(handleTimerEnd, 10000)
    }, [state, data])

    const handleTimerEnd = useCallback(() => {
        // console.log('-->  handleTimerEnd', state)
        if (state.isFetching) {
            setTimeout(handleTimerEnd, 10000)
            return
        }

        if (!state.existing) {
            handleOnComplete()
            return
        }

        handleOvertimeWaiting()
    }, [state])

    const handleTimerUIUpdate = useCallback(() => {
        if (!first.current || !last.current || !text.current) {
            return
        }

        const firstCircleElement = first.current as SVGCircleElement
        const lastCircleElement = last.current as SVGCircleElement
        const textElement = text.current as SVGTextElement

        const [k, l] = calculateDashArray(currentTimerValue.current)

        firstCircleElement.style.strokeDasharray = `${l} ${k}`
        lastCircleElement.style.strokeDasharray = `${k} ${l}`
        firstCircleElement.style.strokeDashoffset = String(l)
        textElement.innerHTML =
            String(PENDING_CHALLENGE_SETUP_TIME - currentTimerValue.current) + 's'
    }, [calculateDashArray])

    useEffect(() => {
        if (currentTimerValue.current >= PENDING_CHALLENGE_SETUP_TIME - 1) {
            return
        }
        handleTimerUIUpdate()
        const interval = setInterval(function () {
            if (currentTimerValue.current >= PENDING_CHALLENGE_SETUP_TIME - 1) {
                clearInterval(interval)
                handleTimerEnd()
                return
            }

            currentTimerValue.current = currentTimerValue.current + 1

            if (!state.bullets[0] && currentTimerValue.current >= timerOneThird) {
                dispatch({ type: Actions.CHECK_FIRST_BULLET })
            }
            if (!state.bullets[1] && currentTimerValue.current >= timerTwoThird) {
                dispatch({ type: Actions.CHECK_SECOND_BULLET })
            }

            const isFetchingAvailable =
                !state.isTimerFetched &&
                currentTimerValue.current + 5 >= PENDING_CHALLENGE_SETUP_TIME - 1
            if (isFetchingAvailable) {
                handleTimerFetching()
            }

            handleTimerUIUpdate()
        }, 1000)
        return () => clearInterval(interval)
    }, [
        handleTimerFetching,
        handleTimerUIUpdate,
        state,
        handleTimerEnd,
        timerOneThird,
        timerTwoThird,
    ])

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <div className={classNames(master.Root, variant.Root, className)}>
                <div className={variant.Top}>
                    {state.isOvertimeMessageShown && (
                        <span className={variant.TimeOutMessage}>
                            {t('challengeTiles.pendingTile.messagePart1')}
                            <br />
                            {t('challengeTiles.pendingTile.messagePart2')}
                        </span>
                    )}
                    {state.isTimerShown && (
                        <svg viewBox='0 0 42 42' className={variant.Timer}>
                            <circle
                                ref={first}
                                className={variant.First}
                                cx='21'
                                cy='21'
                                r='15.91549430918954'
                                strokeDasharray='100 0'
                                strokeDashoffset='100'
                            />
                            <circle
                                ref={last}
                                className={variant.Last}
                                cx='21'
                                cy='21'
                                r='15.91549430918954'
                                strokeDasharray='0 100'
                                strokeDashoffset='0'
                            />
                            <g>
                                <text
                                    className={variant.TextTimer}
                                    ref={text}
                                    x='50%'
                                    y='53%'
                                    dominantBaseline='middle'
                                    textAnchor='middle'
                                    id='counterText'
                                />
                            </g>
                        </svg>
                    )}
                </div>
                <div className={variant.Middle}>
                    <span className={variant.Bullet}>
                        {bulletTop}
                        {t('challengeTiles.pendingTile.options.setupChallenge')}
                    </span>
                    <span className={variant.Bullet}>
                        {bulletMedium}{' '}
                        {t('challengeTiles.pendingTile.options.setupAccess')}
                    </span>
                    <span className={variant.Bullet}>
                        {bulletBottom}{' '}
                        {t('challengeTiles.pendingTile.options.setupAccount')}
                    </span>
                </div>
                <div className={variant.Bottom} />
            </div>
        </Grid>
    )
}

export default Component
