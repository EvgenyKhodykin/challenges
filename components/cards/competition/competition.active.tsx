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

import { TIME_IN_MS } from '../../../lib/utils/time.const'
import IconCheckedList from '../../icons/checked-list'
import IconStandings from '../../icons/standings'
import IconTrophy from '../../icons/trophy'
import Prize from '../../prizes/competition'
import StatusIndicator from '../../statuses/indicator'
import Countdown from '../../time/countdown'
import Button from './button'
import variantStyles from './competition.active.module.scss'
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
    const isRegistrationClosed = moment().isAfter(data?.registrationDeadline)

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
                    className={classNames(styles.RootPreview, styles.Active, className)}
                    data-testid={testIds?.root ?? 'card-competition-active'}
                >
                    <div className={styles.HeaderPreview}>
                        <StatusIndicator
                            className={styles.Status}
                            variant='solid'
                            type='success'
                            displayVariant='preview'
                        >
                            {t('cards.active.status')}
                        </StatusIndicator>
                        <Tooltip
                            title={`Ends on ${moment(data.endDate)
                                .locale(router.locale as string)
                                .format('ll')}`}
                        >
                            <span className={styles.DateLabel}>
                                {t('common:endsIn')}:{' '}
                                <Countdown
                                    fromDate={data.endDate}
                                    className={styles.Date}
                                    format='D[d] H[h] m[m]'
                                    refreshRateInMs={TIME_IN_MS.MINUTE}
                                />
                            </span>
                        </Tooltip>
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
            className={classNames(styles.Root, styles.Active, className)}
            data-testid={testIds?.root ?? 'card-competition-active'}
        >
            <div className={styles.Header}>
                <StatusIndicator className={styles.Status} variant='solid' type='success'>
                    {t('cards.active.status')}
                </StatusIndicator>
                <Tooltip
                    title={`Ends on ${moment(data.endDate)
                        .locale(router.locale as string)
                        .format('ll')}`}
                >
                    <span className={styles.DateLabel}>
                        {t('common:endsIn')}:{' '}
                        <Countdown
                            fromDate={data.endDate}
                            className={styles.Date}
                            format='D[d] H[h] m[m]'
                            refreshRateInMs={TIME_IN_MS.MINUTE}
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
                <div
                    className={classNames(styles.RegistrationDeadline, {
                        [styles.isRegistered]: !isNil(data.participant?.rank),
                    })}
                >
                    <span>
                        {isRegistrationClosed
                            ? t('registrationEnded')
                            : t('registrationEnds')}
                        &nbsp;
                    </span>
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
                    isRegistrationClosed={isRegistrationClosed}
                />
                <div className={styles.LinkContainer}>
                    {isNil(data.participant?.rank) && !isRegistrationClosed && (
                        <>
                            <Link
                                href={`/competitions/${data.id}`}
                                className={styles.LinkStandings}
                            >
                                <IconStandings className={styles.ButtonStandingsIcon} />
                                <span>{t('buttonStandings')}</span>
                            </Link>
                            {'|'}
                        </>
                    )}

                    <Link
                        href='#'
                        onClick={() => context.handleShowRules(data)}
                        className={classNames(styles.LinkRules, {
                            [styles.LinkRulesWithoutStandings]: !isNil(
                                data.participant?.rank
                            ),
                            [variantStyles.LinkRules]: isRegistrationClosed,
                        })}
                    >
                        <IconCheckedList className={styles.LinkRulesIcon} />
                        <span>{t('common:rules.title')}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Competition.displayName = 'Cards:Competition.active'

export default Competition
