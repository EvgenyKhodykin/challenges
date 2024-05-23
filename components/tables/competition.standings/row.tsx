import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import classNames from 'classnames'
import type Competition from 'lib/competitions/competition.interface'
import type Leader from 'lib/leaders/leader.interface'
import { useMemo } from 'react'

import Amount from '../../amount/amount'
import ButtonShare from '../../buttons/share/general'
import IconTrophy from '../../icons/trophy'
import styles from './row.module.scss'

export interface Props {
    participant: Leader
    competition: Competition
}

const Component: React.FC<Props> = ({ participant, competition }: Props): JSX.Element => {
    const prizeAmount = useMemo(() => {
        switch (participant.rank) {
            case 1:
                return competition?.prize?.pool[0]
            case 2:
                return competition?.prize?.pool[1]
            case 3:
                return competition?.prize?.pool[2]
            case 4:
                return competition?.prize?.pool[3]
            case 5:
                return competition?.prize?.pool[4]

            default:
                return ''
        }
    }, [competition, participant])

    const prize = useMemo(() => {
        if ((participant.rank as number) < 4 && !prizeAmount) {
            return (
                <div className={styles.Prize}>
                    <IconTrophy
                        className={classNames(styles.Icon, {
                            [styles.Gold]: participant.rank === 1,
                            [styles.Silver]: participant.rank === 2,
                            [styles.Bronze]: participant.rank === 3,
                        })}
                    />
                </div>
            )
        }
        return (
            <div className={styles.Prize}>
                <div
                    className={classNames(styles.Amount, {
                        [styles.Gold]: participant.rank === 1,
                        [styles.Silver]: participant.rank === 2,
                        [styles.Bronze]: participant.rank === 3,
                    })}
                >
                    {prizeAmount}
                </div>
            </div>
        )
    }, [participant, prizeAmount])

    const social = useMemo(() => {
        if (participant) {
            return <ButtonShare className={styles.Share} />
        }
        return ''
    }, [participant])

    return (
        <TableRow
            className={classNames({
                [styles.Current]:
                    participant.rank &&
                    participant.rank === competition.participant?.rank,
            })}
        >
            <TableCell className={styles.Cell} align='left' padding='none'>
                {participant.rank}
            </TableCell>
            <TableCell className={styles.Cell} align='left' padding='none'>
                {participant.shortName}
            </TableCell>
            <TableCell className={styles.Cell} align='left' padding='none'>
                <Amount
                    className={styles.Account}
                    amount={participant.initialBalance}
                    currency={'USD'}
                    position={'append'}
                    superscript
                />
            </TableCell>
            <TableCell className={styles.Cell} align='left' padding='none'>
                {participant.profit}
            </TableCell>
            <TableCell className={styles.Cell} padding='none' align='left' />
            <TableCell className={styles.Cell} padding='none' align='left'>
                {prize}
            </TableCell>
            <TableCell className={styles.Cell} padding='none' align='left'>
                {social}
            </TableCell>
        </TableRow>
    )
}

Component.displayName = 'Tables:CompetitionStandings:Row'

export default Component
