import classNames from 'classnames'
import { useEffect, useState } from 'react'

import { durationBetweenDates } from '../../lib/utils/time'
import { TIME_IN_MS } from '../../lib/utils/time.const'
import styles from './countdown.module.scss'

export interface Props {
    className?: string
    testId?: string
    fromDate: string
    format?: string
    refreshRateInMs?: number
}

const calculateDuration = (fromDate: string, format?: string) =>
    durationBetweenDates(fromDate, format)

const Countdown: React.FC<Props> = ({
    className,
    testId,
    fromDate,
    format,
    refreshRateInMs = TIME_IN_MS.SECOND,
}: Props): JSX.Element => {
    const [duration, setDuration] = useState('')

    useEffect(() => {
        setDuration(calculateDuration(fromDate, format))
        const interval = setInterval(() => {
            setDuration(calculateDuration(fromDate, format))
        }, refreshRateInMs)

        return () => clearInterval(interval)
    }, [fromDate, format, refreshRateInMs])
    return (
        <span
            className={classNames(styles.Root, className)}
            data-testid={testId ?? 'time-countdown'}
        >
            {duration}
        </span>
    )
}

Countdown.displayName = 'Time:Countdown'

export default Countdown
