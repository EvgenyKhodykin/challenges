import classNames from 'classnames'
import Competition from 'lib/competitions/competition.interface'
import Leader from 'lib/leaders/leader.interface'
import useTranslation from 'next-translate/useTranslation'

import IconChart from '../../icons/chart.arrow-down'
import Paper from '../../surfaces/paper'
import DrawdownAmount from './drawdown.amount'
import styles from './drawdown.total.module.scss'

export interface Props {
    className?: string
    leader: Leader
    competition: Competition
}

const Component: React.FC<Props> = ({
    className,
    competition,
    leader,
}: Props): JSX.Element => {
    const { t } = useTranslation()

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconChart className={styles.Chart} />
                    </span>
                    <span className={styles.Text}>
                        {t('rules.description.list.maxTotalDrawdown', {
                            count: competition.totalMaximumDrawdownPercentage,
                        })}
                    </span>
                </div>
            </div>
            <DrawdownAmount competition={competition} leader={leader} type='total' />
        </Paper>
    )
}

Component.displayName = 'Sections:CompetitionDetails:Drawdown.total'

export default Component
