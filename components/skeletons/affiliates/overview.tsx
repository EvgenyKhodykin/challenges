import Skeleton from '@mui/material/Skeleton'
import classNames from 'classnames'

import Paper from '../../surfaces/paper'
import styles from './overview.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => (
    <Paper className={classNames(styles.Root, className)}>
        <div className={styles.Header}>
            <Skeleton sx={{ fontSize: '1rem' }} width={'40%'} variant='rounded' />
            <Skeleton sx={{ fontSize: '1rem' }} width={'20%'} variant='rounded' />
        </div>
        <div className={styles.Body}>
            <Skeleton sx={{ fontSize: '1.5rem' }} width={'25%'} variant='rounded' />
        </div>
        <div className={styles.Footer}>
            <Skeleton sx={{ fontSize: '1rem' }} width={'35%'} variant='rounded' />
            <Skeleton sx={{ fontSize: '1rem' }} width={'35%'} variant='rounded' />
        </div>
    </Paper>
)

export default Component
