import classNames from 'classnames'
import map from 'lodash/map'
import useTranslation from 'next-translate/useTranslation'
import { useCallback } from 'react'

import { TYPES } from '../../../lib/affiliates/affiliates.const'
import Toggle from '../../inputs/toggle.general'
import styles from './filter.type.module.scss'

export interface Props {
    className?: string
    value: TYPES
    onChange: (value: string) => void
}

const Component: React.FC<Props> = ({
    className,
    value,
    onChange,
}: Props): JSX.Element => {
    const { t } = useTranslation('affiliates')

    const handleToggleChange = useCallback(
        (value: string | Array<string>) => {
            onChange(value as string)
        },
        [onChange]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            <Toggle
                value={value}
                items={map(TYPES, (value: string, key: string) => ({
                    key,
                    element: <span>{t(`filters.types.${key}`)}</span>,
                }))}
                handleToggle={handleToggleChange}
                className={styles.Toggle}
            />
        </div>
    )
}

Component.displayName = 'Sections:Affiliates:Filter.type'

export default Component
