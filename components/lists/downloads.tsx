import Grid from '@mui/material/Grid'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import type Download from '../../lib/downloads/download.interface'
import useList from '../../lib/downloads/hook.list'
import Card from '../cards/download'
import Toggle from '../inputs/toggle'
import styles from './downloads.module.scss'

const Component: React.FC = (): JSX.Element => {
    const [tab, data, handleFilter] = useList()
    const { t } = useTranslation('downloads')

    const list = useMemo(() => {
        if (isEmpty(data)) {
            return <p className={styles.Message}>{t('emptyMessage')}</p>
        }

        const items = map(data, (item: Download, key: number) => (
            <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
                <Card variant={item.platform} data={item} />
            </Grid>
        ))

        return (
            <Grid
                container
                rowSpacing={{ xs: 2, md: 2 }}
                columnSpacing={{ xs: 0, md: 2 }}
            >
                {items}
            </Grid>
        )
    }, [data, t])

    const filters = [
        {
            key: 'tl',
            element: <span className={styles.Label}>TL</span>,
        },
        {
            key: 'mt4',
            element: <span className={styles.Label}>MT4</span>,
        },
        {
            key: 'mt5',
            element: <span className={styles.Label}>MT5</span>,
        },
    ]
    return (
        <>
            <Toggle
                value={tab}
                items={filters}
                handleToggle={handleFilter}
                i18nNamespace='downloads'
                className={styles.Toggle}
            />
            {list}
        </>
    )
}

export default Component
