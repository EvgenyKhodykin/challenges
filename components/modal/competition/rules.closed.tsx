import 'moment/min/locales'

import Tooltip from '@mui/material/Tooltip'
import isNil from 'lodash/isNil'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Competition from '../../../lib/competitions/competition.interface'
import Button from '../../cards/competition/button'
import Participants from '../../cards/competition/participants'
import CheckedLitIcon from '../../icons/checked-list'
import Prize from '../../prizes/competition'
import StatusIndicator from '../../statuses/indicator'
import Body from '../body.general'
import Header from '../header.general'
import ModalGeneral from '../modal.general'
import CompetitionRulesDescription from './description.rules'
import CompetitionRulesFAQs from './faqs.rules'
import styles from './rules.module.scss'
import type Props from './rules-props.interface'

const CompetitionRulesClosed: React.FC<Props> = ({
    shown,
    handleClose,
    data,
    showStandingsButton = true,
}: Props): JSX.Element => {
    const competition = data as Competition
    const { t } = useTranslation('competitions-list')
    const router = useRouter()

    if (isNil(competition)) {
        return <></>
    }

    return (
        <ModalGeneral shown={shown} handleClose={handleClose} className={styles.Root}>
            <Header className={styles.ModalHeader}>
                <div className={styles.CompetitionOverview}>
                    <div className={styles.StatusDate}>
                        <StatusIndicator
                            className={styles.Status}
                            variant='solid'
                            type='error'
                        >
                            {t('cards.closed.status')}
                        </StatusIndicator>
                        <Tooltip
                            title={`${t('common:endedOn')} ${moment(competition.endDate)
                                .locale(router.locale as string)
                                .format('ll')}`}
                        >
                            <span className={styles.DateContainer}>
                                {t('common:endedOn')}{' '}
                                {moment(competition.endDate)
                                    .locale(router.locale as string)
                                    .format('ll')}
                            </span>
                        </Tooltip>
                    </div>

                    <div className={styles.Title}>{competition.title}</div>
                    <Participants
                        totalParticipants={competition.numOfRegisteredUsers}
                        rank={competition.participant?.rank}
                        className={styles.Participants}
                    />
                </div>
                {showStandingsButton && (
                    <Button
                        className={styles.HeaderButton}
                        participant={competition.participant}
                        status={competition.status}
                        id={competition.id}
                    />
                )}
            </Header>
            <Body className={styles.ModalBody}>
                <h4 className={styles.BodyHeader}>
                    <CheckedLitIcon className={styles.Icon} />
                    <span className={styles.IconLabel}>{t('common:rules.title')}</span>
                </h4>
                <Prize
                    variant='top3'
                    prizes={competition.prize}
                    className={styles.Prizes}
                />
                <CompetitionRulesDescription
                    className={styles.Description}
                    competition={competition}
                />
                <CompetitionRulesFAQs className={styles.FAQs} url='' />
            </Body>
        </ModalGeneral>
    )
}

CompetitionRulesClosed.displayName = 'Modal:Competition:Rules.closed'

export default CompetitionRulesClosed
