import type { Theme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import times from 'lodash/times'
import { useCallback, useMemo } from 'react'

import type Props from '../../../lib/pages/competitions-list/list-props.interface'
import styles from './list.tile.module.scss'

const Component: React.FC<Props> = (): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isMedium = useMediaQuery(theme.breakpoints.up('md'))
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
    const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl'))

    const numberOfTimes = useMemo<number>(() => {
        if (isExtraLarge) {
            return 4
        } else if (isLarge) {
            return 3
        } else if (isMedium) {
            return 2
        } else {
            return 1
        }
    }, [isLarge, isExtraLarge, isMedium])

    const renderSkeleton = useCallback<SkeletonRenderCallback>(
        (key: number) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={key}>
                <div className={styles.Skeleton}>
                    <div className={styles.Header}>
                        <Skeleton
                            sx={{ fontSize: '0.8125rem' }}
                            width={'30%'}
                            variant='text'
                        />
                        <Skeleton
                            sx={{ fontSize: '0.8125rem' }}
                            width={'30%'}
                            variant='text'
                        />
                    </div>
                    <div className={styles.Body}>
                        <Skeleton width={'50%'} height={'25%'} variant='rounded' />
                        <Skeleton
                            sx={{ fontSize: '1.375rems' }}
                            width={'30%'}
                            variant='text'
                        />
                        <Skeleton
                            sx={{ fontSize: '0.8125rem' }}
                            width={'30%'}
                            variant='text'
                        />
                        <Skeleton width={'50%'} height={'25%'} variant='rounded' />
                    </div>
                    <Skeleton className={styles.Footer} width={'30%'} variant='text' />
                </div>
            </Grid>
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
            {times<JSX.Element>(numberOfTimes, renderSkeleton)}
        </Grid>
    )
}

export default Component

export type SkeletonRenderCallback = (key: number) => JSX.Element
