import 'moment/min/locales'

import classNames from 'classnames'
import map from 'lodash/map'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type Account from '../../../lib/accounts/account.interface'
import Amount from '../../amount/amount'
import CredentialsButton from '../../buttons/credentials'
import type { CredentialsCardTestId } from '../../buttons/credentials-test-ids.interface'
import ArrowRightIcon from '../../icons/arrow-right'
import styles from './footer.module.scss'

export interface TestIds {
    container?: string
    left?: string
    right?: string
    tags?: string
    id?: string
    amount?: string
    credentials?: CredentialsCardTestId
    details?: string
}

export interface Props {
    data: Account
    hovered: boolean
    onCredentials: React.MouseEventHandler
    className?: string
    testIds?: TestIds
    displayVariant?: 'card' | 'preview'
}

const Footer: React.FC<Props> = ({
    className,
    hovered,
    onCredentials,
    testIds,
    data,
    displayVariant,
}: Props): JSX.Element => {
    const router = useRouter()

    const isCompetition = useMemo(() => data.type === 'competition', [data])

    const tags = useMemo(() => {
        const testId = testIds?.tags ?? 'cards-footer-challenge-tags'
        return (
            <p className={styles.Tags} data-testid={testId}>
                {map(data.tags, (tag: string, key: number) => (
                    <span key={key}>{tag}</span>
                ))}
            </p>
        )
    }, [data, testIds])

    const id = useMemo(() => {
        const ends = moment(new Date(data.endDate))
            .locale(router.locale as string)
            .format('ll')
        const testId = testIds?.id ?? 'cards-footer-challenge-id'
        return (
            <p className={styles.Id} data-testid={testId}>
                {`#${data.login}`}&nbsp;&#183;&nbsp;{ends}
            </p>
        )
    }, [data, testIds, router])

    const account = useMemo(
        () => (
            <Amount
                amount={data.account.amount}
                currency={data.account.currency}
                position={'append'}
                kilo
                superscript
                className={styles.StartingAmount}
            />
        ),
        [data]
    )
    return (
        <div
            className={classNames(styles.Root, className, {
                [styles.Preview]: displayVariant === 'preview',
            })}
            data-testid={testIds?.container ?? 'cards-footer-challenge-container'}
        >
            <div
                className={styles.Left}
                data-testid={testIds?.left ?? 'cards-footer-challenge-left'}
            >
                {displayVariant !== 'preview' && tags}
                {displayVariant !== 'preview' && id}
                {account}
            </div>
            {isCompetition && (
                <div className={styles.Middle}>
                    <span className={styles.Title}>
                        {displayVariant !== 'preview' && data.competitionTitle}
                    </span>
                </div>
            )}
            {displayVariant !== 'preview' && (
                <div
                    className={classNames(styles.Right, {
                        [styles.Competition]: isCompetition,
                    })}
                    data-testid={testIds?.right ?? 'cards-footer-challenge-right'}
                >
                    <CredentialsButton
                        variant='card'
                        handleClick={onCredentials}
                        testIds={testIds?.credentials}
                    />
                    <Link
                        href={`/challenges/${data.id}`}
                        className={classNames(styles.ButtonDetails, {
                            [styles.Hovered]: hovered,
                        })}
                        data-testid={testIds?.details ?? 'cards-footer-challenge-details'}
                    >
                        <ArrowRightIcon />
                    </Link>
                </div>
            )}
        </div>
    )
}

Footer.displayName = 'Cards:Footer.challenge'

export default Footer
