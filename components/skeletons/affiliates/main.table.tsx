import Skeleton from '@mui/material/Skeleton'

import styles from './main.table.module.scss'

const Component: React.FC = (): JSX.Element => (
    <div className={styles.Root}>
        <div className={styles.Header}>
            <Skeleton sx={{ fontSize: '1rem' }} width={'5%'} variant='text' />
            <Skeleton sx={{ fontSize: '1rem' }} width={'10%'} variant='text' />
            <Skeleton sx={{ fontSize: '1rem' }} width={'10%'} variant='text' />
            <Skeleton sx={{ fontSize: '1rem' }} width={'10%'} variant='text' />
            <Skeleton sx={{ fontSize: '1rem' }} width={'10%'} variant='text' />
        </div>
        <div className={styles.Body}>
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
            <Skeleton width={'100%'} height={'5%'} variant='rounded' />
        </div>
    </div>
)

export default Component
