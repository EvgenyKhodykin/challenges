import classNames from 'classnames'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo } from 'react'

import {
    DASHBOARD_CARD_AMOUNT_DISPLAY,
    DASHBOARD_STATUSES,
} from '../../lib/challenges/challenges.const'
import Reload from '../buttons/reload'
import Toggle from '../inputs/toggle.general'
import styles from './dashboard.module.scss'

export interface Props {
    amountVariant: DASHBOARD_CARD_AMOUNT_DISPLAY
    onChangeAmountVariant: (value: DASHBOARD_CARD_AMOUNT_DISPLAY) => void
    statusFilter: DASHBOARD_STATUSES
    onChangeStatusFilter: (value: DASHBOARD_STATUSES) => void
    handleRefresh: React.MouseEventHandler
    isRefreshing?: boolean
    className?: string
    children?: React.ReactNode
}

const Details: React.FC<Props> = ({
    className,
    amountVariant,
    statusFilter,
    handleRefresh,
    isRefreshing = true,
    onChangeAmountVariant,
    onChangeStatusFilter,
    children,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')

    const amountVariants = useMemo(
        () =>
            map(DASHBOARD_CARD_AMOUNT_DISPLAY, (value: string) => ({
                key: value,
                element: <span>{t(`filters.amount.${value}`)}</span>,
            })),
        [t]
    )

    const statuses = useMemo(
        () =>
            map(DASHBOARD_STATUSES, (value: string) => ({
                key: value,
                element: <span>{t(`filters.status.${value}`)}</span>,
            })),
        [t]
    )

    const handleAmountVariantChange = useCallback(
        (key: string | Array<string>) =>
            onChangeAmountVariant(key as DASHBOARD_CARD_AMOUNT_DISPLAY),
        [onChangeAmountVariant]
    )

    const handleStatusFilterChange = useCallback(
        (key: string | Array<string>) => onChangeStatusFilter(key as DASHBOARD_STATUSES),
        [onChangeStatusFilter]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <h1 className={styles.Heading}>{t('title')}</h1>
                <Reload disabled={isRefreshing} onClick={handleRefresh} />
            </div>
            <div className={styles.Bottom}>
                <div className={styles.Left}>{children}</div>
                <div className={styles.Toggles}>
                    <Toggle
                        value={amountVariant}
                        items={amountVariants}
                        handleToggle={handleAmountVariantChange}
                        className={styles.Toggle}
                    />
                    <Toggle
                        value={statusFilter}
                        items={statuses}
                        handleToggle={handleStatusFilterChange}
                        className={styles.Toggle}
                    />
                </div>
            </div>
        </div>
    )
}

Details.displayName = 'Headers:Details.challenge'

export default Details
