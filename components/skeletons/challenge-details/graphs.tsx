import Skeleton from '@mui/material/Skeleton'

import styles from './graphs.module.scss'

export interface Props {
    isDesktop?: boolean
    isStep?: boolean
}

const Component: React.FC<Props> = ({
    isDesktop = true,
    isStep = false,
}: Props): JSX.Element => (
    <>
        {isDesktop ? (
            <div className={styles.Skeleton}>
                <div className={styles.Header}>
                    <Skeleton
                        sx={{ fontSize: '1.8125rem' }}
                        width={'35%'}
                        variant='text'
                    />
                    <Skeleton
                        sx={{ fontSize: '1.8125rem' }}
                        width={'10%'}
                        variant='text'
                    />
                </div>
                <div className={styles.Body}>
                    <Skeleton
                        sx={{ fontSize: '0.7125rem' }}
                        width={'100%'}
                        variant='text'
                    />
                </div>
                <div className={styles.Footer}>
                    <Skeleton width={'25%'} variant='text' />
                    <Skeleton width={'15%'} variant='text' />
                </div>
            </div>
        ) : (
            <div className={styles.Skeleton}>
                <div className={styles.Header}>
                    <Skeleton
                        sx={{ fontSize: '1.8125rem' }}
                        width={'35%'}
                        variant='text'
                    />
                    <Skeleton
                        sx={{ fontSize: '1.8125rem' }}
                        width={'7%'}
                        variant='text'
                    />
                </div>
                <div className={styles.Body}>
                    {isStep ? (
                        <>
                            <Skeleton
                                sx={{ fontSize: '0.9125rem' }}
                                width={'60%'}
                                variant='text'
                            />
                            <Skeleton
                                sx={{ fontSize: '0.9125rem' }}
                                width={'60%'}
                                variant='text'
                            />
                        </>
                    ) : (
                        <Skeleton
                            sx={{ fontSize: '0.6125rem' }}
                            width={'100%'}
                            variant='text'
                        />
                    )}
                </div>
            </div>
        )}
    </>
)

export default Component
