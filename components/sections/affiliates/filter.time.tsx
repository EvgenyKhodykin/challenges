/* eslint-disable react-hooks/exhaustive-deps */
import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo } from 'react'

import { TIMES } from '../../../lib/affiliates/affiliates.const'
import Select from '../../inputs/select.rounded'
import Toggle from '../../inputs/toggle.general'
import styles from './filter.time.module.scss'

export interface Props {
    className?: string
    onChange: (value: string) => void
    value: TIMES
}

const Component: React.FC<Props> = ({
    value,
    onChange,
    className,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const { t } = useTranslation('affiliates')

    const desktopItems = useMemo(
        () =>
            map(TIMES, (value: string, key: string) => ({
                label: t(`filters.times.${key}`),
                value,
            })),
        [TIMES, t]
    )

    const mobileItems = useMemo(
        () =>
            map(TIMES, (value: string, key: string) => ({
                key,
                element: <span>{t(`filters.times.${key}`)}</span>,
            })),
        [TIMES, t]
    )

    const handleSelectChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value)
        },
        [onChange]
    )

    const handleToggleChange = useCallback(
        (value: string | Array<string>) => {
            onChange(value as string)
        },
        [onChange]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            {isDesktop && (
                <Select
                    value={value}
                    name='time'
                    onChange={handleSelectChange}
                    items={desktopItems}
                />
            )}
            {!isDesktop && (
                <Toggle
                    value={value}
                    items={mobileItems}
                    handleToggle={handleToggleChange}
                    className={styles.Toggle}
                />
            )}
        </div>
    )
}

Component.displayName = 'Sections:Affiliates:Filter.time'

export default Component
