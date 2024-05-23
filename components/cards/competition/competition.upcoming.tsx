import 'moment/min/locales'

import Tooltip from '@mui/material/Tooltip'
import classNames from 'classnames'
import CompetitionsContext from 'lib/pages/competitions-list/context'
import isNil from 'lodash/isNil'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useContext } from 'react'

import IconCheckedList from '../../icons/checked-list'
import IconStandings from '../../icons/standings'
import IconTrophy from '../../icons/trophy'
import Prize from '../../prizes/competition'
import StatusIndicator from '../../statuses/indicator'
import Countdown from '../../time/countdown'
import Button from './button'
import styles from './competition.module.scss'
import variantStyles from './competition.upcoming.module.scss'
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
                    data-testid={testIds?.root ?? 'card-competition-upcoming'}
                >
                    <div className={styles.HeaderPreview}>
                        <StatusIndicator
                            className={styles.Status}
                            variant='blinking'
                            type='success'
                            displayVariant='preview'
                        >
                            {t('cards.upcoming.status')}
                        </StatusIndicator>
                        <Tooltip
                            title={`Starts on ${moment(data.startDate)
                                .locale(router.locale as string)
                                .format('ll')}`}
                        >
                            <span
                                className={classNames(
                                    styles.DateLabel,
                                    variantStyles.DateLabelPreview
                                )}
                            >
                                {t('startsIn')}:{' '}
                                <Countdown
                                    fromDate={data.startDate}
                                    className={styles.Date}
                                    format='D[d] H[h] m[m]'
                                />
                            </span>
                        </Tooltip>
                    </div>
                    <div className={styles.BodyPreview}>
                        <div className={styles.TitlePreview}>{data?.title}</div>
                        <Participants
                            totalParticipants={data.numOfRegisteredUsers}
                            rank={data.participant?.rank}
                            className={classNames(styles.ParticipantsPreview, {
                                [styles.NoRank]: isNil(data.participant?.rank),
                            })}
                        />
                    </div>
                    <div className={styles.FooterPreview}>
                        <span>{t('registrationEnds')}</span>
                        <span>
                            {moment(data.registrationDeadline)
                                .locale(router.locale as string)
                                .format('ll')}
                        </span>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div
            className={classNames(styles.Root, variantStyles.Root, className)}
            data-testid={testIds?.root ?? 'card-competition-upcoming'}
        >
            <div className={styles.Header}>
                <StatusIndicator
                    className={styles.Status}
                    variant='blinking'
                    type='success'
                >
                    {t('cards.upcoming.status')}
                </StatusIndicator>
                <Tooltip
                    title={`Starts on ${moment(data.startDate)
                        .locale(router.locale as string)
                        .format('ll')}`}
                >
                    <span className={styles.DateLabel}>
                        {t('startsIn')}:{' '}
                        <Countdown
                            fromDate={data.startDate}
                            className={styles.Date}
                            format='D[d] H[h] m[m]'
                        />
                    </span>
                </Tooltip>
            </div>
            <div className={styles.Body}>
                <IconTrophy className={styles.Icon} />
                <Prize variant='laurels' prizes={data?.prize} className={styles.Prize} />
                <div className={styles.Title}>{data?.title}</div>
                <Participants
                    totalParticipants={data.numOfRegisteredUsers}
                    rank={data.participant?.rank}
                    className={classNames(styles.Participants, {
                        [styles.NoRank]: isNil(data.participant?.rank),
                    })}
                />
                <div className={styles.RegistrationDeadline}>
                    <span>{t('registrationEnds')}&nbsp;</span>
                    <span>
                        {moment(data.registrationDeadline)
                            .locale(router.locale as string)
                            .format('ll')}
                    </span>
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
                        href={`/competitions/${data.id}`}
                        className={styles.LinkStandings}
                    >
                        <IconStandings className={styles.ButtonStandingsIcon} />
                        <span>{t('buttonStandings')}</span>
                    </Link>
                    {'|'}
                    <Link
                        href='#'
                        onClick={() => context.handleShowRules(data)}
                        className={styles.LinkRules}
                    >
                        <IconCheckedList className={styles.LinkRulesIcon} />
                        <span>{t('common:rules.title')}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Competition.displayName = 'Cards:Competition.upcoming'

export default Competition
