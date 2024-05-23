import classNames from 'classnames'
import moment from 'moment'
import { useMemo } from 'react'

import type Competition from '../../lib/competitions/competition.interface'
import { DURATION_DATE_OUTPUT_FORMAT } from '../../lib/competitions/competitions.const'
import styles from './linear.competition-duration.module.scss'

export type Data = Pick<Competition, 'startDate' | 'endDate'>

export interface Props {
    data: Data
    className?: string
}

const Component: React.FC<Props> = ({ data, className }: Props): JSX.Element => {
    const [startValue, currentValue, endValue]: Array<number> = useMemo(
        () => [
            moment(data.startDate).unix(),
            moment().unix(),
            moment(data.endDate).unix(),
        ],
        [data]
    )
    const isBefore = useMemo(() => currentValue < startValue, [startValue, currentValue])
    const isAfter = useMemo(() => currentValue > endValue, [currentValue, endValue])
    const isShownCurrent = useMemo(() => !isBefore && !isAfter, [isBefore, isAfter])
    const isProgressShown = useMemo(() => !isBefore, [isBefore])
    const left = useMemo(() => {
        let result = 0
        if (isAfter) {
            result = 100
        } else if (isShownCurrent) {
            result = ((currentValue - startValue) / (endValue - startValue)) * 100
        }
        return result.toFixed(1)
    }, [startValue, currentValue, endValue, isAfter, isShownCurrent])
    const startLabel = useMemo(
        () => moment(data.startDate).format(DURATION_DATE_OUTPUT_FORMAT),
        [data]
    )
    const endLabel = useMemo(
        () => moment(data.endDate).format(DURATION_DATE_OUTPUT_FORMAT),
        [data]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            <ul className={styles.Track}>
                {isProgressShown && (
                    <div
                        className={styles.Progress}
                        style={{ left: 0, width: `${left}%` }}
                    />
                )}
                <li
                    className={classNames(styles.Dot, styles.First, {
                        [styles.Checked]: !isBefore,
                    })}
                >
                    <span>{startLabel}</span>
                </li>
                <li
                    className={classNames(styles.Dot, styles.Last, {
                        [styles.Checked]: isAfter,
                    })}
                >
                    <span>{endLabel}</span>
                </li>
                {isShownCurrent && (
                    <li
                        className={classNames(styles.Dot, styles.Current)}
                        style={{ left: `${left}%` }}
                    />
                )}
            </ul>
        </div>
    )
}

Component.displayName = 'Graphs:Linear.competition-duration'

export default Component
