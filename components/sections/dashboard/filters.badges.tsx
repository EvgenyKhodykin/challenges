import classNames from 'classnames'
import find from 'lodash/find'
import remove from 'lodash/remove'
import { Fragment, useCallback, useMemo } from 'react'

import type { ToggleGeneralItem } from '../../../lib/utils/toggle-items.interface'
import { DASHBOARD_FILTERS_CHALLENGE_TYPE } from '../../../lib/utils/utils.const'
import Tag from '../../inputs/tag'
import styles from './filters.badges.module.scss'
import FiltersProps from './filters-props.interface'

export interface Props extends FiltersProps {
    filterCurrencyValues: Array<string>
    filterCurrencyVariants: Array<ToggleGeneralItem>
    onFilterCurrency: (value: Array<string>) => void
    filterAmountValues: Array<string>
    filterAmountVariants: Array<ToggleGeneralItem>
    onFilterAmount: (value: Array<string>) => void
    className?: string
}

const Component: React.FC<Props> = ({
    className,
    onFilterType,
    filterCurrencyValues,
    filterCurrencyVariants,
    onFilterCurrency,
    filterAmountValues,
    filterAmountVariants,
    onFilterAmount,
    filters,
}: Props): JSX.Element => {
    const filterTypeVariants = useMemo(
        (): Array<ToggleGeneralItem> => [
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.STAGE_1, element: 'Stage 1' },
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.STAGE_2, element: 'Stage 2' },
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.FUNDED, element: 'Funded' },
            { key: DASHBOARD_FILTERS_CHALLENGE_TYPE.COMPETITION, element: 'Competition' },
        ],
        []
    )

    const typeBadges = useMemo(
        () =>
            filters.type.reduce((results: Array<React.ReactNode>, value: string) => {
                const item: ToggleGeneralItem | undefined = find(filterTypeVariants, {
                    key: value,
                })

                if (item) {
                    results.push(
                        <Tag
                            data={{
                                value: item.key,
                                text: item.element as string,
                            }}
                            onRemove={(value: string | number) => {
                                const items = [...filters.type]
                                remove(items, (item: string) => item === value)
                                onFilterType(items)
                            }}
                            className={styles.Badge}
                        />
                    )
                }
                return results
            }, []),
        [filters, onFilterType, filterTypeVariants]
    )

    const currencyBadges = useMemo(
        () =>
            filterCurrencyValues.reduce(
                (results: Array<React.ReactNode>, value: string) => {
                    const item: ToggleGeneralItem | undefined = find(
                        filterCurrencyVariants,
                        { key: value }
                    )

                    if (item) {
                        results.push(
                            <Tag
                                data={{
                                    value: item.key,
                                    text: item.element as string,
                                }}
                                onRemove={(value: string | number) => {
                                    const items = [...filterCurrencyValues]
                                    remove(items, (item: string) => item === value)
                                    onFilterCurrency(items)
                                }}
                                className={styles.Badge}
                            />
                        )
                    }
                    return results
                },
                []
            ),
        [filterCurrencyValues, onFilterCurrency, filterCurrencyVariants]
    )

    const amountBadges = useMemo(
        () =>
            filterAmountValues.reduce(
                (results: Array<React.ReactNode>, value: string) => {
                    const item: ToggleGeneralItem | undefined = find(
                        filterAmountVariants,
                        { key: value }
                    )

                    if (item) {
                        results.push(
                            <Tag
                                data={{
                                    value: item.key,
                                    text: item.element as string,
                                }}
                                onRemove={(value: string | number) => {
                                    const items = [...filterAmountValues]
                                    remove(items, (item: string) => item === value)
                                    onFilterAmount(items)
                                }}
                                className={styles.Badge}
                            />
                        )
                    }
                    return results
                },
                []
            ),
        [filterAmountValues, onFilterAmount, filterAmountVariants]
    )

    const badges = useMemo(
        () =>
            [...typeBadges, ...currencyBadges, ...amountBadges].map(
                (element: React.ReactNode, key: number) => (
                    <Fragment key={key}>{element}</Fragment>
                )
            ),
        [typeBadges, currencyBadges, amountBadges]
    )

    const isClearAllShown = useMemo(() => !!badges.length, [badges])

    const handleClearAll = useCallback(() => {
        onFilterAmount([])
        onFilterCurrency([])
        onFilterType([])
    }, [onFilterAmount, onFilterCurrency, onFilterType])

    return (
        <div className={classNames(styles.Root, className)}>
            {badges}
            {isClearAllShown && (
                <button
                    type='button'
                    onClick={handleClearAll}
                    className={styles.ClearAll}
                >
                    Clear All
                </button>
            )}
        </div>
    )
}

Component.displayName = 'Sections:Dashboard:Filters.badges'

export default Component
