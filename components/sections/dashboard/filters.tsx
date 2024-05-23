import { IconButton } from '@mui/material'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo } from 'react'

import type { ToggleGeneralItem } from '../../../lib/utils/toggle-items.interface'
import { LAYOUT_PRIVATE_WITH_SIDEBAR_FILTERS_TOGGLE_TIME } from '../../../lib/utils/utils.const'
import { DASHBOARD_FILTERS_CHALLENGE_TYPE } from '../../../lib/utils/utils.const'
import IconFilter from '../../icons/filters'
import IconFilterRounded from '../../icons/filters.rounded'
import Toggles from '../../inputs/toggle.filters'
import styles from './filters.module.scss'
import FiltersProps from './filters-props.interface'

export interface Props extends FiltersProps {
    isFilterOpened: boolean
    filterCurrencyValues: Array<string>
    filterCurrencyVariants: Array<ToggleGeneralItem>
    onFilterCurrency: (value: Array<string>) => void
    filterAmountValues: Array<string>
    filterAmountVariants: Array<ToggleGeneralItem>
    onFilterAmount: (value: Array<string>) => void
    onToggleFilters: () => void
}

const Component: React.FC<Props> = ({
    isFilterOpened,
    className,
    onFilterType,
    onFilterCurrency,
    filterCurrencyValues,
    filterCurrencyVariants,
    filterAmountValues,
    filterAmountVariants,
    onFilterAmount,
    onToggleFilters,
    filters,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')

    const filterTypeVariants = useMemo(
        (): Array<ToggleGeneralItem> => [
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.STAGE_1, element: 'Stage 1' },
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.STAGE_2, element: 'Stage 2' },
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.FUNDED, element: 'Funded' },
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.COMPETITION, element: 'Competition' },
        ],
        []
    )

    const handleFilterType = useCallback(
        (value: string | Array<string>) =>
            onFilterType(value as Array<DASHBOARD_FILTERS_CHALLENGE_TYPE>),
        [onFilterType]
    )

    const handleFilterCurrency = useCallback(
        (value: string | Array<string>) => onFilterCurrency(value as Array<string>),
        [onFilterCurrency]
    )

    const handleFilterAmount = useCallback(
        (value: string | Array<string>) => onFilterAmount(value as Array<string>),
        [onFilterAmount]
    )

    const duration = useMemo(
        () => LAYOUT_PRIVATE_WITH_SIDEBAR_FILTERS_TOGGLE_TIME / 2,
        []
    )

    const button = useMemo(
        () => (
            <motion.div
                key={'button'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
                className={styles.Button}
                onClick={onToggleFilters}
            >
                <IconButton>
                    <IconFilterRounded />
                </IconButton>
            </motion.div>
        ),
        [duration, onToggleFilters]
    )

    const filtersList = useMemo(
        () => (
            <div className={styles.Filters}>
                <div className={styles.Title}>
                    <IconFilter className={styles.Icon} />
                    <span>{t('sidebar.filters')}</span>
                </div>
                <div className={styles.Group}>
                    <span className={styles.Label}>{t('sidebar.challengeType')}</span>
                    <Toggles
                        value={filters.type}
                        items={filterTypeVariants}
                        handleToggle={handleFilterType}
                    />
                </div>
                <div className={styles.Group}>
                    <span className={styles.Label}>{t('sidebar.currency')}</span>
                    <Toggles
                        value={filterCurrencyValues}
                        items={filterCurrencyVariants}
                        handleToggle={handleFilterCurrency}
                    />
                </div>
                <div className={styles.Group}>
                    <span className={styles.Label}>{t('sidebar.amount')}</span>
                    <Toggles
                        value={filterAmountValues}
                        items={filterAmountVariants}
                        handleToggle={handleFilterAmount}
                    />
                </div>
            </div>
        ),
        [
            filters,
            filterTypeVariants,
            handleFilterType,
            filterCurrencyValues,
            filterCurrencyVariants,
            handleFilterCurrency,
            filterAmountValues,
            filterAmountVariants,
            handleFilterAmount,
            t,
        ]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            <AnimatePresence initial={false} mode={'wait'}>
                {!isFilterOpened && button}
                {isFilterOpened && (
                    <motion.div
                        key={'wrapper'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration }}
                        className={styles.Wrapper}
                    >
                        {filtersList}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

Component.displayName = 'Sections:Dashboard:Filters'

export default Component
