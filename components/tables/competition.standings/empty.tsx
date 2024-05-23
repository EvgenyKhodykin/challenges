import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import useTranslation from 'next-translate/useTranslation'

import { STANDINGS_TABLE_HEAD } from '../../../lib/competitions/competitions.const'
import styles from './empty.module.scss'

const Component: React.FC = (): JSX.Element => {
    const { t } = useTranslation('common')

    return (
        <TableRow>
            <TableCell
                className={styles.Empty}
                colSpan={STANDINGS_TABLE_HEAD.length}
                align='center'
            >
                {t('noDataTableMessage')}
            </TableCell>
        </TableRow>
    )
}

export default Component
