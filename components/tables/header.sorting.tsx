import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import classNames from 'classnames'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'

import type Data from '../../lib/utils/table.sorting-header.interface'
import styles from './header.sorting.module.scss'

export interface Props {
    data: Array<Data>
    orderBy?: string
    order?: 'asc' | 'desc'
    handleSorting: (key: string) => void
    i18nNamespace: string
    className?: string
}

const Component: React.FC<Props> = ({
    className,
    data,
    i18nNamespace,
    orderBy,
    order,
    handleSorting,
}: Props): JSX.Element => {
    const createHandler = (key: string) => () => handleSorting(key)
    const { t } = useTranslation(i18nNamespace)

    return (
        <TableHead className={classNames(styles.Root, className)}>
            <TableRow>
                {map(data, (item: Data, index: number) => (
                    <TableCell
                        key={index}
                        sortDirection={
                            item.sorting && item.id === orderBy ? order : undefined
                        }
                        align={item.align ?? 'left'}
                        padding='none'
                        className={styles.Cell}
                    >
                        {item.sorting && (
                            <TableSortLabel
                                active={item.id === orderBy}
                                direction={item.id === orderBy ? order : 'asc'}
                                onClick={createHandler(item.id)}
                                className={styles.WithSorting}
                            >
                                {t(`table.headers.${item.id}`)}
                            </TableSortLabel>
                        )}
                        {!item.sorting && (
                            <span className={styles.WithoutSorting}>
                                {t(`table.headers.${item.id}`)}
                            </span>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

Component.displayName = 'Tables:Header.sorting'

export default Component
