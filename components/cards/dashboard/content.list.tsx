/* eslint-disable react-hooks/exhaustive-deps */
import 'moment/min/locales'

import classNames from 'classnames'
import { ACCOUNTS_STATUS } from 'lib/accounts/accounts.const'
import { durationBetweenDates } from 'lib/utils/time'
import map from 'lodash/map'
import round from 'lodash/round'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import { DASHBOARD_CARD_AMOUNT_DISPLAY } from '../../../lib/challenges/challenges.const'
import type Price from '../../../lib/utils/price.interface'
import Amount from '../../amount/amount'
import CredentialsButton from '../../buttons/credentials'
import ArrowRightIcon from '../../icons/arrow-right'
import type { Variant as StatusVariant } from '../../statuses/challenge'
import Status from '../../statuses/challenge'
import styles from './content.list.module.scss'

export interface Props {
    status: ACCOUNTS_STATUS
    tags: Array<string>
    id: string
    endDate: Date
    account: Price
    balance: Price
    upper: Price
    lower: Price
    amountVariant: DASHBOARD_CARD_AMOUNT_DISPLAY
    hovered: boolean
    onCredentials: React.MouseEventHandler
    className?: string
}

const Footer: React.FC<Props> = ({
    className,
    hovered,
    tags,
    id,
    account,
    balance,
    upper,
    lower,
    amountVariant,
    endDate,
    onCredentials,
    status,
}: Props): JSX.Element => {
    const router = useRouter()
    const { t } = useTranslation('common')
    const timer = durationBetweenDates(endDate.toISOString())

    const displayedDate = useMemo(() => {
        if (moment().isAfter(endDate)) {
            return (
                <span className={styles.EndDate}>
                    {t('common:endedOn')}:{' '}
                    <span>
                        {moment(endDate)
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
    }, [router, timer, t])

    const right = useMemo(() => {
        let value: Price = {
                amount: 0,
                currency: account.currency,
            },
            label = ''
        switch (amountVariant) {
            case DASHBOARD_CARD_AMOUNT_DISPLAY.AMOUNT_TO_GOAL:
                const amount = round(upper.amount - balance.amount, 2)
                label = 'Amount to Goal'
                value = {
                    amount: amount < 0 ? 0 : amount,
                    currency: account.currency,
                }
                break
            case DASHBOARD_CARD_AMOUNT_DISPLAY.BALANCE:
                label = 'Balance'
                value = {
                    ...balance,
                }
                break
            case DASHBOARD_CARD_AMOUNT_DISPLAY.PROFIT:
            default:
                label = 'Current Profit'
                value = {
                    amount: round(balance.amount - account.amount, 2),
                    currency: account.currency,
                }
                break
        }

        return (
            <div className={styles.Right}>
                <span className={styles.Label}>{label}</span>
                <Amount
                    amount={value.amount}
                    currency={value.currency}
                    position={'append'}
                    zeroAmount={'0'}
                    superscript
                    className={styles.Amount}
                />
            </div>
        )
    }, [account, balance, upper, lower, amountVariant])

    return (
        <div className={classNames(styles.Root, className)}>
            <div className={styles.Content}>
                <div className={styles.Left}>
                    <div className={styles.Status}>
                        <Status status={status as StatusVariant} />
                        <span className={styles.Date}>{displayedDate}</span>
                    </div>
                    <p className={styles.Tags}>
                        {map(tags, (tag: string, key: number) => (
                            <span key={key}>{tag}</span>
                        ))}
                    </p>
                    <p className={styles.Id}>
                        {`#${id}`}&nbsp;&#183;&nbsp;
                        {moment(endDate)
                            .locale(router.locale as string)
                            .format('ll')}
                    </p>
                    <Amount
                        amount={account.amount}
                        currency={account.currency}
                        position={'append'}
                        kilo
                        superscript
                        className={styles.StartingAmount}
                    />
                </div>
                {right}
            </div>
            <div className={styles.Actions}>
                <CredentialsButton variant='card' handleClick={onCredentials} />
                <Link
                    href={`/challenges/${id}`}
                    className={classNames(styles.ButtonDetails, {
                        [styles.Hovered]: hovered,
                    })}
                >
                    <ArrowRightIcon />
                </Link>
            </div>
        </div>
    )
}

Footer.displayName = 'Cards:Footer.challenge'

export default Footer
