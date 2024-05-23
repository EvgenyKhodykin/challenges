import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import classNames from 'classnames'
import times from 'lodash/times'
import React, { useCallback, useMemo } from 'react'

import type Props from '../../../lib/pages/dashboard/list-props.interface'
import Card, { Variant as CardVariant } from '../../cards/dashboard'
import styles from './list.table.module.scss'

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => {
    const newChallenge = useMemo<JSX.Element>(
        () => (
            <Grid item xs={12}>
                <Card variant={CardVariant.TABLE_NEW} />
            </Grid>
        ),
        []
    )

    const renderSkeleton = useCallback<SkeletonRenderCallback>(
        (key: number) => (
            <Grid item xs={12} key={key}>
                <Skeleton className={styles.Skeleton} variant='rounded' />
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
            className={classNames(styles.Root, className)}
        >
            {newChallenge}
            {times<JSX.Element>(2, renderSkeleton)}
        </Grid>
    )
}

export default Component

export type SkeletonRenderCallback = (key: number) => JSX.Element
