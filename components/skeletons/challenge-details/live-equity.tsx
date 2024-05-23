import type { Theme } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import styles from './live-equity.module.scss'

export interface Props {
    isToggled?: boolean
}

const Component: React.FC<Props> = ({ isToggled = false }: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <>
            {isDesktop ? (
                <div className={styles.Skeleton}>
                    {!isToggled && (
                        <div className={styles.Header}>
                            <Skeleton
                                width={'25%'}
                                sx={{ fontSize: '1.5rem' }}
                                variant='rounded'
                            />
                            <Skeleton
                                sx={{ fontSize: '2.2rem' }}
                                width={'35%'}
                                variant='rounded'
                            />
                        </div>
                    )}
                    <div className={styles.Body}>
                        <div className={styles.BodyHeaders}>
                            <Skeleton
                                width={'20%'}
                                sx={{ fontSize: '0.8rem' }}
                                variant='rounded'
                            />
                            <Skeleton
                                width={'30%'}
                                sx={{ fontSize: '0.8rem' }}
                                variant='rounded'
                            />
                        </div>
                        <div className={styles.InnerContainer}>
                            <div className={styles.Graph}>
                                <Skeleton
                                    width={'100%'}
                                    height={'100%'}
                                    variant='rounded'
                                />
                            </div>
                            <div className={styles.Amount}>
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                            </div>
                        </div>
                    </div>
                    {!isToggled && (
                        <div className={styles.Footer}>
                            <Skeleton
                                width={'40%'}
                                variant='rounded'
                                sx={{ fontSize: '3rem' }}
                            />
                            <Skeleton
                                width={'40%'}
                                variant='rounded'
                                sx={{ fontSize: '3rem' }}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.Skeleton}>
                    {!isToggled && (
                        <div className={styles.Header}>
                            <div>
                                <Skeleton
                                    sx={{ fontSize: '1.5rem' }}
                                    width={'25%'}
                                    variant='rounded'
                                />
                            </div>
                            <div className={styles.Toggle}>
                                <Skeleton
                                    sx={{ fontSize: '2.2rem' }}
                                    width={'45%'}
                                    variant='rounded'
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.Body}>
                        <div className={styles.BodyHeaders}>
                            <Skeleton
                                width={'20%'}
                                sx={{ fontSize: '0.8rem' }}
                                variant='rounded'
                            />
                            <Skeleton
                                width={'30%'}
                                sx={{ fontSize: '0.8rem' }}
                                variant='rounded'
                            />
                        </div>
                        <div className={styles.InnerContainer}>
                            <div className={styles.Graph}>
                                <Skeleton
                                    width={'100%'}
                                    height={'100%'}
                                    variant='rounded'
                                />
                            </div>
                            <div className={styles.Amount}>
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                                <Skeleton
                                    width={'100%'}
                                    sx={{ fontSize: '0.8rem' }}
                                    variant='rounded'
                                />
                            </div>
                        </div>
                    </div>
                    {!isToggled && (
                        <div className={styles.Footer}>
                            <Skeleton
                                width={'100%'}
                                variant='rounded'
                                sx={{ fontSize: '2.5rem' }}
                            />
                            <Skeleton
                                width={'100%'}
                                variant='rounded'
                                sx={{ fontSize: '2.5rem' }}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Component
