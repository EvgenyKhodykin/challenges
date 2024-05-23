import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import classNames from 'classnames'
import Leader from 'lib/leaders/leader.interface'
import CompetitionContext from 'lib/pages/competition-details/context'
import useTranslation from 'next-translate/useTranslation'
import { useContext, useMemo } from 'react'

import {
    STANDINGS_PER_PAGE,
    STANDINGS_TABLE_HEAD,
} from '../../../lib/competitions/competitions.const'
import Header from '../header.sorting'
import Pagination from '../pagination.general'
import FiltersActions from './actions'
import Body from './body'
import styles from './index.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => {
    const { t } = useTranslation('common')

    const {
        competition,
        participants,
        handlePageChange,
        handleRowPerPageChange,
        handleSearch,
    } = useContext(CompetitionContext)

    const currentParticipant = useMemo(
        (): Leader => ({
            guid: competition.participant?.guid || '',
            initialBalance: competition.participant?.initialBalance || 0,
            shortName: competition.participant?.shortName || '',
            profit: competition.participant?.profit || 0,
            rank: competition.participant?.rank || 0,
            currentEquity: competition.participant?.currentEquity || 0,
            percentReturn: competition.participant?.percentReturn || 0,
        }),
        [competition]
    )

    const isUserOnPage = useMemo(
        (): boolean =>
            participants.data
                .map((participant) => participant.rank)
                .includes(currentParticipant.rank),
        [currentParticipant, participants]
    )

    return (
        <>
            <FiltersActions value={participants.searchValue} onChange={handleSearch} />
            <TableContainer className={classNames(className)} component={'div'}>
                <Table>
                    <Header
                        data={STANDINGS_TABLE_HEAD}
                        handleSorting={() => null}
                        className={styles.Header}
                        i18nNamespace='competitions-details'
                    />
                    <Body
                        participants={participants.data}
                        competition={competition}
                        isUserOnPage={isUserOnPage}
                        currentParticipant={currentParticipant}
                    />
                </Table>
            </TableContainer>
            {participants.data.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={STANDINGS_PER_PAGE}
                    component={'div'}
                    count={participants.total}
                    rowsPerPage={participants.limit}
                    page={participants.page}
                    ActionsComponent={Pagination}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowPerPageChange}
                    className={styles.Pagination}
                    labelRowsPerPage={t('paginationTitle')}
                />
            )}
        </>
    )
}

Component.displayName = 'Tables:Journal.trading-history'

export default Component
