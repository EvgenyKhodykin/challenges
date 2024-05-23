import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import { useCallback } from 'react'

import styles from './standings.table.module.scss'

const Component: React.FC = (): JSX.Element => {
    const renderSkeleton = useCallback(
        () => (
            <div className={styles.Skeleton}>
                <div className={styles.Search}>
                    <Skeleton sx={{ fontSize: '2.0rem' }} width={'30%'} variant='text' />
                </div>
                <div className={styles.Header}>
                    <Skeleton
                        sx={{ fontSize: '0.8125rem' }}
                        width={'5%'}
                        variant='text'
                    />
                    <Skeleton
                        sx={{ fontSize: '0.8125rem' }}
                        width={'10%'}
                        variant='text'
                    />
                    <Skeleton
                        sx={{ fontSize: '0.8125rem' }}
                        width={'10%'}
                        variant='text'
                    />
                    <Skeleton
                        sx={{ fontSize: '0.8125rem' }}
                        width={'10%'}
                        variant='text'
                    />
                    <Skeleton
                        sx={{ fontSize: '0.8125rem' }}
                        width={'10%'}
                        variant='text'
                    />
                    <Skeleton
                        sx={{ fontSize: '0.8125rem' }}
                        width={'10%'}
                        variant='text'
                    />
                </div>
                <div className={styles.Body}>
                    <Skeleton width={'100%'} height={'15%'} variant='rounded' />
                    <Skeleton width={'100%'} height={'15%'} variant='rounded' />
                    <Skeleton width={'100%'} height={'15%'} variant='rounded' />
                    <Skeleton width={'100%'} height={'15%'} variant='rounded' />
                    <Skeleton width={'100%'} height={'15%'} variant='rounded' />
                </div>
                <div className={styles.Footer}>
                    <Skeleton width={'20%'} variant='text' />
                </div>
            </div>
        ),
        []
    )

    return (
        <Grid
            container
            rowSpacing={{ xs: 2, md: 2 }}
            columnSpacing={{ xs: 0, md: 2 }}
            key={'fetching-list-tile'}
        >
            {renderSkeleton()}
        </Grid>
    )
}

export default Component
