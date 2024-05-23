import classNames from 'classnames'
import Competition from 'lib/competitions/competition.interface'
import { isNil } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

import IconPeople from '../../icons/people'
import IconPerson from '../../icons/person'
import IconStandings from '../../icons/standings'
import TableList from '../../sections/competition-details/standings.list'
import Paper from '../../surfaces/paper'
import styles from './standings.module.scss'

export interface Props {
    className?: string
    competition: Competition
}

const Component: React.FC<Props> = ({ className, competition }: Props): JSX.Element => {
    const { t } = useTranslation('competitions-details')

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconStandings className={styles.Standings} />
                    </span>
                    <span className={styles.Text}>{t('standings.rightBoard.title')}</span>
                </div>
                <div className={styles.Participants}>
                    <div
                        className={classNames(styles.Container, {
                            [styles.emptyRank]: isNil(competition.participant?.rank),
                        })}
                    >
                        <IconPerson className={styles.Icon} />
                        <span className={styles.Number}>
                            {competition.participant?.rank}
                        </span>
                    </div>
                    <div className={styles.Container}>
                        <IconPeople className={styles.Icon} />
                        <span className={styles.Number}>
                            {competition.numOfRegisteredUsers}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <TableList competition={competition} />
            </div>
        </Paper>
    )
}

Component.displayName = 'Sections:CompetitionDetails:Standings'

export default Component
