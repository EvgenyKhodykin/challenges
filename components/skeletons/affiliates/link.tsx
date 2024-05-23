import type { Theme } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Paper from '../../surfaces/paper'
import styles from './link.module.scss'

const Component: React.FC = (): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Paper className={styles.Root}>
            {isDesktop && (
                <>
                    <div className={styles.Header}>
                        <Skeleton
                            sx={{ fontSize: '1rem' }}
                            width={'40%'}
                            variant='text'
                        />
                        <Skeleton
                            className={styles.Subscription}
                            sx={{ fontSize: '1rem' }}
                            width={'60%'}
                            variant='text'
                        />
                    </div>
                    <div className={styles.Body}>
                        <div className={styles.Select}>
                            <Skeleton width={'55%'} height={'100%'} variant='rounded' />
                            <Skeleton width={'25%'} height={'100%'} variant='rounded' />
                        </div>
                        <Skeleton className={styles.Link} variant='rounded' />
                    </div>
                </>
            )}
            {!isDesktop && (
                <>
                    <div className={styles.Header}>
                        <Skeleton
                            sx={{ fontSize: '1.2rem' }}
                            width={'40%'}
                            variant='text'
                        />
                        <div className={styles.Subscription}>
                            <Skeleton
                                sx={{ fontSize: '0.9rem' }}
                                width={'100%'}
                                variant='text'
                            />
                            <Skeleton
                                sx={{ fontSize: '0.9rem' }}
                                width={'100%'}
                                variant='text'
                            />
                        </div>
                    </div>
                    <div className={styles.Body}>
                        <Skeleton width={'100%'} height={'25%'} variant='rounded' />
                        <Skeleton width={'100%'} height={'25%'} variant='rounded' />
                        <Skeleton width={'100%'} height={'25%'} variant='rounded' />
                    </div>
                </>
            )}
        </Paper>
    )
}

export default Component
