import classNames from 'classnames'
import times from 'lodash/times'
import { useEffect, useRef, useState } from 'react'

import styles from './linear.dotted.module.scss'

export interface TestIds {
    root?: string
    progress?: string
    dot?: string
    label?: string
}

export interface Props {
    steps: number
    current: number
    mode?: 'light' | 'dark'
    labels?: Partial<{ [key: number]: string }>
    visible?: Array<number>
    className?: string
    testIds?: TestIds
}

const Component: React.FC<Props> = ({
    className,
    steps,
    visible,
    current,
    labels,
    testIds,
    mode = 'light',
}: Props): JSX.Element => {
    const currentDot = useRef<HTMLLIElement>(null)
    const track = useRef<HTMLUListElement>(null)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if (!track.current) {
            return
        }
        const isGreater = current > steps
        if (!currentDot.current && !isGreater) {
            return
        }

        const handler = () => {
            let value = 0
            if (!currentDot.current && isGreater) {
                value = (track.current as HTMLUListElement).offsetWidth
            } else if (currentDot.current) {
                value = currentDot.current.offsetLeft
            }
            if (progress !== value) {
                setProgress(value)
            }
        }

        if (!progress) {
            handler()
        }

        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDot.current, track.current])

    return (
        <div
            className={classNames(styles.Root, className, {
                [styles.WithLabels]: !!labels,
            })}
            style={{ minWidth: steps * 12 + 'px' }}
            data-testid={testIds?.root ?? 'graphs-linear-dotted-root'}
        >
            <ul
                ref={track}
                className={classNames(styles.Track, {
                    [styles.NoTrack]: steps === 1,
                })}
            >
                {steps > 1 && (
                    <div
                        className={classNames(styles.Progress, {
                            [styles.Dark]: mode === 'dark',
                        })}
                        style={{
                            width: progress,
                        }}
                        data-testid={testIds?.progress ?? 'graphs-linear-dotted-progress'}
                    />
                )}
                {times(steps, (key) => {
                    const isCurrent =
                        current > 0 && current <= steps && key + 1 === current
                    const liClass = classNames(styles.Dot, {
                        [styles.Visible]:
                            !Array.isArray(visible) || visible.includes(key + 1),
                        [styles.Current]: isCurrent,
                        [styles.Done]: current > 0 && key + 1 < current,
                        [styles.Dark]: mode === 'dark',
                        [styles.Single]: steps === 1,
                    })
                    const testId = testIds?.dot ?? 'graphs-linear-dotted-dot'
                    const labelComponent = !!labels && !!labels[key + 1] && (
                        <span
                            data-testid={testIds?.label ?? 'graphs-linear-dotted-label'}
                        >
                            {labels[key + 1]}
                        </span>
                    )
                    if (isCurrent) {
                        return (
                            <li
                                ref={currentDot}
                                className={liClass}
                                key={key}
                                data-testid={testId}
                            >
                                {labelComponent}
                            </li>
                        )
                    }
                    return (
                        <li className={liClass} key={key} data-testid={testId}>
                            {labelComponent}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

Component.displayName = 'Graphs:Linear.dotted'

export default Component
