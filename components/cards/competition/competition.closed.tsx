import 'moment/min/locales'

import classNames from 'classnames'
import CompetitionsContext from 'lib/pages/competitions-list/context'
import isNil from 'lodash/isNil'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useContext } from 'react'

import IconCheckedList from '../../icons/checked-list'
import IconTrophy from '../../icons/trophy'
import Prize from '../../prizes/competition'
import StatusIndicator from '../../statuses/indicator'
import Button from './button'
import variantStyles from './competition.closed.module.scss'
import styles from './competition.module.scss'
import type Props from './competition-props.interface'
import Participants from './participants'

const Competition: React.FC<Props> = ({
    className,
    testIds,
    data,
    displayVariant,
    onPress,
}: Props): JSX.Element => {
    const { t } = useTranslation('competitions-list')
    const router = useRouter()
    const context = useContext(CompetitionsContext)

    if (isNil(data)) {
        return <></>
    }

    if (displayVariant === 'preview') {
        return (
            <Link
                href={`/competitions/${data.id}`}
                style={{ textDecoration: 'none' }}
                onClick={onPress}
            >
                <div
                    className={classNames(
                        styles.RootPreview,
                        variantStyles.Root,
                        className
                    )}
                    data-testid={testIds?.root ?? 'card-competition-closed'}
                >
                    <div className={styles.HeaderPreview}>
                        <StatusIndicator
                            className={styles.Status}
                            variant='solid'
                            type='error'
                        >
                            {t('cards.closed.status')}
                        </StatusIndicator>
                        <span className={styles.DateLabel}>
                            {t('common:endedOn')}&nbsp;
                            {moment(data.endDate)
                                .locale(router.locale as string)
                                .format('ll')}
                        </span>
                    </div>
                    <div className={styles.TitlePreview}>{data?.title}</div>
                    <Participants
                        totalParticipants={data.numOfRegisteredUsers}
                        rank={data.participant?.rank}
                        className={classNames(styles.ParticipantsPreview, {
                            [styles.NoRank]: isNil(data.participant?.rank),
                        })}
                    />
                </div>
            </Link>
        )
    }

    return (
        <div
            className={classNames(styles.Root, variantStyles.Root, className)}
            data-testid={testIds?.root ?? 'card-competition-closed'}
        >
            <div className={styles.Header}>
                <StatusIndicator className={styles.Status} variant='solid' type='error'>
                    {t('cards.closed.status')}
                </StatusIndicator>
                <span className={styles.DateLabel}>
                    {t('common:endedOn')}:&nbsp;
                    {moment(data.endDate)
                        .locale(router.locale as string)
                        .format('ll')}
                </span>
            </div>
            <div className={styles.Body}>
                <IconTrophy className={classNames(styles.Icon, variantStyles.Icon)} />
                <Prize
                    variant='laurels'
                    prizes={data?.prize}
                    className={classNames(styles.Prize, variantStyles.Prize)}
                />
                <div className={styles.Title}>{data?.title}</div>
                <Participants
                    totalParticipants={data.numOfRegisteredUsers}
                    rank={data.participant?.rank}
                    className={classNames(styles.Participants, {
                        [styles.NoRank]: isNil(data.participant?.rank),
                    })}
                />
                <div
                    className={classNames(styles.RegistrationDeadline, {
                        [styles.isRegistered]: !isNil(data.participant?.rank),
                    })}
                >
                    {''}
                </div>
            </div>
            <div className={styles.Footer}>
                <Button
                    participant={data.participant}
                    status={data.status}
                    id={data.id}
                />
                <div className={styles.LinkContainer}>
                    <Link
                        href='#'
                        onClick={() => context.handleShowRules(data)}
                        className={classNames(styles.LinkRules, variantStyles.LinkRules)}
                    >
                        <IconCheckedList className={styles.LinkRulesIcon} />
                        <span>{t('common:rules.title')}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Competition.displayName = 'Cards:Competition.closed'

export default Competition
