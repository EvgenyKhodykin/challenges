/* eslint-disable react-hooks/exhaustive-deps */
import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import State from 'lib/pages/affiliates/state.interface'
import { useCallback, useMemo, useState } from 'react'

import { TYPES } from '../../../lib/affiliates/affiliates.const'
import Skeleton from '../../skeletons/affiliates/overview'
import Board from '../../surfaces/board'
import Paper from '../../surfaces/paper'
import TableCommissions from '../../tables/affiliates/affiliates.commissions'
import TablePayouts from '../../tables/affiliates/affiliates.payouts'
import TableReferrals from '../../tables/affiliates/affiliates.referrals'
import Commissions from './commissions'
import FilterTime from './filter.time'
import FilterType from './filter.type'
import styles from './main.module.scss'
import Payouts from './payouts'
import ReferralsOverview from './referrals.overview'

export interface Props {
    state: State
    setFilterTime: (key: string) => void
    className?: string
}

const Component: React.FC<Props> = ({
    state,
    setFilterTime,
    className,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const [filterType, setFilterType] = useState<TYPES>(TYPES.REFERRALS)

    const referralsOverview = useMemo(() => {
        if (state.referrals.loading) {
            return <Skeleton className={styles.ReferralsOverview} />
        }
        return (
            <ReferralsOverview
                className={styles.ReferralsOverview}
                value={state.referrals.data}
                commissions={state.commissionsList.data}
                timeInterval={state.filterTime}
            />
        )
    }, [state.referrals])

    const commissionsOverview = useMemo(() => {
        if (state.commissions.loading) {
            return <Skeleton className={styles.Commissions} />
        }
        return (
            <Commissions
                className={styles.Commissions}
                value={state.commissions.data}
                commissions={state.commissionsList.data}
                timeInterval={state.filterTime}
            />
        )
    }, [state.commissions])

    const payoutsOverview = useMemo(() => {
        if (state.payouts.loading) {
            return <Skeleton />
        }
        return <Payouts value={state.payouts.data} />
    }, [state.payouts])

    const setFilterTypeCallback = useCallback(
        (key: string) => setFilterType(key as TYPES),
        [TYPES, setFilterType]
    )
    const tableFilters = useMemo(
        () => (
            <FilterType
                value={filterType}
                onChange={setFilterTypeCallback}
                className={styles.FilterType}
            />
        ),
        [filterType, setFilterTypeCallback]
    )

    const overviewFilters = useMemo(
        () => (
            <FilterTime
                value={state.filterTime}
                onChange={setFilterTime}
                className={styles.FilterTime}
            />
        ),
        [state, setFilterTime]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            {isDesktop && (
                <Paper className={styles.Wrapper}>
                    <Board className={styles.Overview}>
                        {overviewFilters}
                        {referralsOverview}
                        {commissionsOverview}
                        {payoutsOverview}
                    </Board>
                    <div className={styles.List}>
                        {tableFilters}
                        <AnimatePresence initial={false} mode='wait'>
                            {filterType === TYPES.REFERRALS && (
                                <motion.div
                                    key={'desktop-referrals'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TableReferrals timeInterval={state.filterTime} />
                                </motion.div>
                            )}
                            {filterType === TYPES.COMMISSIONS && (
                                <motion.div
                                    key={'desktop-commissions'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TableCommissions
                                        campaigns={state.campaigns.data}
                                        commissions={state.commissionsList.data}
                                        isLoading={state.commissionsList.loading}
                                        timeInterval={state.filterTime}
                                    />
                                </motion.div>
                            )}
                            {filterType === TYPES.PAYOUTS && (
                                <motion.div
                                    key={'desktop-payouts'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TablePayouts
                                        timeInterval={state.filterTime}
                                        payouts={state.payoutsList.data}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Paper>
            )}
            {!isDesktop && (
                <>
                    {overviewFilters}
                    <Board className={styles.Overview}>
                        {referralsOverview}
                        {commissionsOverview}
                        {payoutsOverview}
                    </Board>
                    <Paper className={styles.List}>
                        {tableFilters}
                        <AnimatePresence initial={false} mode='wait'>
                            {filterType === TYPES.REFERRALS && (
                                <motion.div
                                    key={'desktop-referrals'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TableReferrals timeInterval={state.filterTime} />
                                </motion.div>
                            )}
                            {filterType === TYPES.COMMISSIONS && (
                                <motion.div
                                    key={'desktop-commissions'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TableCommissions
                                        campaigns={state.campaigns.data}
                                        commissions={state.commissionsList.data}
                                        isLoading={state.commissionsList.loading}
                                        timeInterval={state.filterTime}
                                    />
                                </motion.div>
                            )}
                            {filterType === TYPES.PAYOUTS && (
                                <motion.div
                                    key={'desktop-payouts'}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TablePayouts
                                        timeInterval={state.filterTime}
                                        payouts={state.payoutsList.data}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Paper>
                </>
            )}
        </div>
    )
}

Component.displayName = 'Sections:Affiliates:Main'

export default Component
