import Skeleton from '@mui/material/Skeleton'
import classNames from 'classnames'

import styles from './sidebar.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => (
    <div className={classNames(styles.Skeleton, className)}>
        <div className={styles.Header}>
            <Skeleton width={'30%'} sx={{ fontSize: '0.8rem' }} variant='rounded' />
            <Skeleton width={'45%'} sx={{ fontSize: '0.8rem' }} variant='rounded' />
        </div>
        <div className={styles.Body}>
            <Skeleton width={'50%'} sx={{ fontSize: '1rem' }} variant='rounded' />
        </div>
        <div className={styles.Footer}>
            <Skeleton width={'15%'} sx={{ fontSize: '0.8rem' }} variant='rounded' />
        </div>
    </div>
)

export default Component
