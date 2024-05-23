/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import { COMPETITION_STATUS } from '../../lib/competitions/competitions.const'
import styles from './competition.module.scss'

export type Variant = COMPETITION_STATUS

export interface Props {
    variant: Variant
    className?: string
}

const Component: React.FC<Props> = ({ variant, className }: Props): JSX.Element => {
    const { t } = useTranslation('competitions-list')

    const text = useMemo(() => {
        switch (variant) {
            case COMPETITION_STATUS.ACTIVE:
                return t('cards.active.status')
            case COMPETITION_STATUS.CLOSED:
                return t('cards.closed.status')
            case COMPETITION_STATUS.UPCOMING:
                return t('cards.upcoming.status')
        }
    }, [variant, t])

    return (
        <span
            className={classNames(
                styles.Root,
                {
                    [styles.Active]:
                        variant === COMPETITION_STATUS.ACTIVE ||
                        variant === COMPETITION_STATUS.UPCOMING,
                    [styles.Closed]: variant === COMPETITION_STATUS.CLOSED,
                },
                className
            )}
        >
            {text}
        </span>
    )
}

Component.displayName = 'Statuses:Competition'

export default Component
