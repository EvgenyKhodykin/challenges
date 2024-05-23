import TableBody from '@mui/material/TableBody'
import type Competition from 'lib/competitions/competition.interface'
import type Leader from 'lib/leaders/leader.interface'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import { Fragment, useCallback, useMemo } from 'react'

import styles from './body.module.scss'
import Empty from './empty'
import Row from './row'

export interface Props {
    participants: Array<Leader>
    competition: Competition
    isUserOnPage: boolean
    currentParticipant: Leader
}

const Component: React.FC<Props> = ({
    participants,
    competition,
    isUserOnPage,
    currentParticipant,
}: Props): JSX.Element => {
    const isEmptyData = useMemo(() => isEmpty(participants), [participants])

    const isCurrentParticipant = useMemo(() => {
        if (
            !isUserOnPage &&
            !isEmptyData &&
            competition.participant &&
            participants[0].rank
        ) {
            return true
        }
        return false
    }, [competition, participants, isEmptyData, isUserOnPage])

    const handleMap = useCallback(
        (row: Leader, index: number) => (
            <Fragment key={index}>
                <Row participant={row} competition={competition} />
            </Fragment>
        ),
        [competition]
    )
    return (
        <TableBody className={styles.Body}>
            {isEmptyData && <Empty />}
            {!isEmptyData && map(participants, handleMap)}
            {isCurrentParticipant && (
                <Row participant={currentParticipant} competition={competition} />
            )}
        </TableBody>
    )
}

Component.displayName = 'Tables:TradingHistory:Body'

export default Component
