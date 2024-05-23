import Competition from 'lib/competitions/competition.interface'

import TableSkeleton from '../../../components/skeletons/competition-details/standings.table'
import Table from '../../tables/competition.standings'

export type Props = { competition: Competition }

const Component: React.FC<Props> = ({ competition }: Props): JSX.Element => (
    <>{competition.id > 0 ? <Table /> : <TableSkeleton />}</>
)

Component.displayName = 'Sections:CompetitionDetails:Standings:List'
export default Component
