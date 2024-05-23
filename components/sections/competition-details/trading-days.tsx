import classNames from 'classnames'
import Competition from 'lib/api/competitions/competition.interface'
import useTranslation from 'next-translate/useTranslation'

import type { DAY } from '../../icons/calendar'
import IconCalendar from '../../icons/calendar'
import Paper from '../../surfaces/paper'
import styles from './trading-days.module.scss'

export interface Props {
    className?: string
    competition: Competition
}

const Component: React.FC<Props> = ({ className, competition }: Props): JSX.Element => {
    const { t } = useTranslation()

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconCalendar day={4 as DAY} className={styles.Chart} />
                    </span>
                    <span className={styles.Text}>
                        {t('rules.description.list.minTradingDays', {
                            count: competition.minDays,
                        })}
                    </span>
                </div>
            </div>
        </Paper>
    )
}
Component.displayName = 'Sections:CompetitionDetails:TradingDays'

export default Component
