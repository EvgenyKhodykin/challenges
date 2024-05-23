import type { Theme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import times from 'lodash/times'
import { useCallback, useMemo } from 'react'

import type Props from '../../../lib/pages/dashboard/list-props.interface'
import type LayoutEventHandler from '../../../lib/utils/events/layout-handler.interface'
import Card, { Variant as CardVariant } from '../../cards/dashboard'
import styles from './list.tile.module.scss'

const Component: React.FC<Props> = ({
    className,
    state,
    onLayout = () => undefined,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
    const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl'))

    const numberOfTimes = useMemo<number>(() => {
        if (isExtraLarge) {
            return 3
        } else if (isLarge) {
            return 2
        } else {
            return 1
        }
    }, [isLarge, isExtraLarge])

    const newChallenge = useMemo<JSX.Element>(
        () => (
            <Grid
                item
                xs={12}
                md={6}
                lg={4}
                xl={3}
                className={styles.NewChallengeContainer}
            >
                <Card
                    className={classNames({
                        [styles.Snapped]: state.isNewChallengeSnapped,
                    })}
                    variant={CardVariant.TILE_NEW}
                />
            </Grid>
        ),
        [state.isNewChallengeSnapped]
    )

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
                        <Skeleton
                            sx={{ fontSize: '0.8125rem' }}
                            width={'25%'}
                            variant='text'
                        />
                        <Skeleton
                            sx={{ fontSize: '2.1875rem' }}
                            width={'40%'}
                            variant='text'
                        />
                    </div>
                    <Skeleton className={styles.Footer} variant='rounded' />
                </div>
            </Grid>
        ),
        []
    )

    const handleLayout = useCallback<LayoutEventHandler>(
        (node: HTMLDivElement | null) => {
            if (!node) {
                onLayout(undefined)
                return
            }

            onLayout({
                top: node.offsetTop,
                left: node.offsetLeft,
                width: node.clientWidth,
                height: node.clientHeight,
            })
        },
        [onLayout]
    )

    return (
        <Grid
            container
            rowSpacing={{ xs: 2, md: 2 }}
            columnSpacing={{ xs: 0, md: 2 }}
            ref={handleLayout}
            key={'fetching-list-tile'}
            className={classNames(styles.Root, className)}
        >
            {newChallenge}
            {times<JSX.Element>(numberOfTimes, renderSkeleton)}
        </Grid>
    )
}

export default Component

export type SkeletonRenderCallback = (key: number) => JSX.Element
