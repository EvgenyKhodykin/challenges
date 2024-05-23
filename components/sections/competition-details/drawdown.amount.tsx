import Competition from 'lib/competitions/competition.interface'
import Leader from 'lib/leaders/leader.interface'

import Amount from '../../amount/amount'
import styles from './drawdown.amount.module.scss'

export interface Props {
    type: string
    competition: Competition
    leader: Leader
    className?: string
}

const Component: React.FC<Props> = ({
    type,
    competition,
    leader,
}: Props): JSX.Element => {
    if (!leader) {
        return <></>
    }

    return (
        <div className={styles.Bottom}>
            <span className={styles.ValueMax}>
                Max:{' '}
                <Amount
                    className={styles.Amount}
                    amount={
                        type === 'total'
                            ? leader.initialBalance *
                              (competition.totalMaximumDrawdownPercentage / 100)
                            : leader.initialBalance *
                              (competition.dailyMaximumDrawdownPercentage / 100)
                    }
                    currency={'USD'}
                    position={'append'}
                    superscript
                />
            </span>
        </div>
    )
}

Component.displayName = 'Sections:CompetitionDetails:Drawdown.amount'

export default Component
