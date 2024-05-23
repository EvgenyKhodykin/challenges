/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import { useMemo } from 'react'

import type Price from '../../lib/utils/price.interface'
import Amount from '../amount/amount'
import Slider from '../interactivity/slider'
import styles from './linear.slider.module.scss'

export interface Data {
    upper: Price
    lower: Price
    account: Price
    balance: Price
}

export interface Props {
    data: Data
    className?: string
}

const Component: React.FC<Props> = ({ data, className }: Props): JSX.Element => {
    const isLowerOverflowed = useMemo(
        () => data.balance.amount - data.lower.amount <= 0,
        [data.lower.amount, data.balance.amount]
    )
    const isUpperOverflowed = useMemo(
        () => data.balance.amount - data.upper.amount >= 0,
        [data.upper.amount, data.balance.amount]
    )
    const leftValue: Price = useMemo(
        () => (isLowerOverflowed ? data.balance : data.lower),
        [data.lower.amount, data.balance.amount, isLowerOverflowed]
    )
    const rightValue: Price = useMemo(
        () => (isUpperOverflowed ? data.balance : data.upper),
        [data.upper.amount, data.balance.amount, isUpperOverflowed]
    )
    const lowerPosition: string = useMemo(() => {
        const length = rightValue.amount - leftValue.amount
        const value = Math.abs(data.lower.amount - leftValue.amount)

        return `${(value / length) * 100}%`
    }, [data.lower.amount, data.balance.amount, leftValue.amount, rightValue.amount])
    const upperPosition: string = useMemo(() => {
        const length = rightValue.amount - leftValue.amount
        const value = data.upper.amount - leftValue.amount

        return `${(value / length) * 100}%`
    }, [data.upper.amount, data.balance.amount, leftValue.amount, rightValue.amount])
    const accountPosition: string = useMemo(() => {
        const length = rightValue.amount - leftValue.amount
        const value = data.account.amount - leftValue.amount

        return `${(value / length) * 100}%`
    }, [data.account.amount, leftValue.amount, rightValue.amount])
    const balancePosition: string = useMemo(() => {
        const length = rightValue.amount - leftValue.amount
        const value = data.balance.amount - leftValue.amount

        return `${(value / length) * 100}%`
    }, [data.balance.amount, leftValue.amount, rightValue.amount])
    const [progressLeft, progressRight] = useMemo(() => {
        const length = rightValue.amount - leftValue.amount

        if (data.balance.amount > data.account.amount) {
            const value = data.balance.amount - leftValue.amount
            return [accountPosition, `${100 - (value / length) * 100}%`]
        } else if (data.balance.amount < data.account.amount) {
            const value = data.account.amount - leftValue.amount
            return [balancePosition, `${100 - (value / length) * 100}%`]
        } else {
            return [accountPosition, accountPosition]
        }
    }, [data.account.amount, data.balance.amount, leftValue.amount, rightValue.amount])
    const isLoss: boolean = useMemo(
        () => data.balance.amount - data.account.amount < 0,
        [data.account.amount, data.balance.amount]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            <ul className={styles.Track}>
                <div
                    className={classNames(styles.Progress, {
                        [styles.Profit]: !isLoss,
                        [styles.Loss]: isLoss,
                    })}
                    style={{ left: progressLeft, right: progressRight }}
                />
                <li
                    className={classNames(styles.Dot, {
                        [styles.First]:
                            !isLowerOverflowed ||
                            data.lower.amount == data.balance.amount,
                    })}
                    style={{ left: lowerPosition }}
                >
                    <Amount
                        amount={data.lower.amount}
                        currency={data.lower.currency}
                        position={'append'}
                        className={styles.Label}
                        superscript
                        kilo
                    />
                </li>
                <li
                    className={classNames(styles.Dot, {
                        [styles.Last]:
                            !isUpperOverflowed ||
                            data.upper.amount == data.balance.amount,
                    })}
                    style={{ left: upperPosition }}
                >
                    <Amount
                        amount={data.upper.amount}
                        currency={data.upper.currency}
                        position={'append'}
                        className={styles.Label}
                        superscript
                        kilo
                    />
                </li>
                <li className={styles.Account} style={{ left: accountPosition }}>
                    <Amount
                        amount={data.account.amount}
                        currency={data.account.currency}
                        position={'append'}
                        className={styles.Label}
                        superscript
                        kilo
                    />
                </li>
                <li
                    className={classNames(styles.Balance, {
                        [styles.First]: isLowerOverflowed,
                        [styles.Last]: isUpperOverflowed,
                    })}
                    style={{ left: balancePosition }}
                >
                    <Slider />
                    <Amount
                        amount={data.balance.amount}
                        currency={data.balance.currency}
                        position={'append'}
                        className={styles.Label}
                        superscript
                    />
                </li>
            </ul>
        </div>
    )
}

Component.displayName = 'Graphs:Linear.slider'

export default Component
