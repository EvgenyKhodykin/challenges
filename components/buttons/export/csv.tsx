import classNames from 'classnames'
import { CSVLink } from 'react-csv'

import type CSVDataRow from '../../../lib/utils/csv-data-row.interface'
import ExportIcon from '../../icons/export'
import styles from './csv.module.scss'

export type Headers = Array<{
    label: string
    key: string
}>

export interface Props {
    headers: Headers
    data: Array<CSVDataRow>
    fileName?: string
    className?: string
    children?: React.ReactNode | string
}

const Component: React.FC<Props> = ({
    headers,
    data,
    fileName,
    className,
    children = 'EXPORT',
}: Props): JSX.Element => (
    <CSVLink
        className={classNames(styles.Root, className)}
        filename={fileName}
        data={data}
        headers={headers}
    >
        <ExportIcon className={styles.Icon} />
        <span>{children}</span>
    </CSVLink>
)

export default Component
