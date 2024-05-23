import Tooltip from '@mui/material/Tooltip'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import IconPeople from '../../icons/people'
import IconPerson from '../../icons/person'
import styles from './participants.module.scss'
import type Props from './participants-props.interface'

const Participants: React.FC<Props> = ({
    className,
    testIds,
    totalParticipants,
    rank,
}: Props): JSX.Element => {
    const { t } = useTranslation('common')

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'cards-competition-participants'}
        >
            <Tooltip
                title={`${t(
                    'participantsTooltips.totalParticipants'
                )} ${totalParticipants}`}
            >
                <div className={styles.Container}>
                    <IconPeople className={styles.Icon} />
                    <span className={styles.Number}>{totalParticipants}</span>
                </div>
            </Tooltip>

            {rank && (
                <Tooltip title={`${t('participantsTooltips.yourRank')} ${rank}`}>
                    <div className={styles.Container}>
                        <IconPerson className={classNames(styles.Icon, styles.Person)} />
                        <span className={styles.Number}>{rank}</span>
                    </div>
                </Tooltip>
            )}
        </div>
    )
}

Participants.displayName = 'Cards:Competition.participants'

export default Participants
