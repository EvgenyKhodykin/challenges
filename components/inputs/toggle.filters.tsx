import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import classNames from 'classnames'
import map from 'lodash/map'
import { useCallback } from 'react'

import type { ToggleGeneralItem } from '../../lib/utils/toggle-items.interface'
import styles from './toggle.filters.module.scss'
import type ToggleProps from './toggle-props.interface'

export interface Props
    extends Pick<
        ToggleProps<ToggleGeneralItem>,
        'items' | 'className' | 'ariaLabel' | 'handleToggle'
    > {
    value: Array<string>
}

const Component: React.FC<Props> = ({
    value,
    items,
    ariaLabel,
    className,
    handleToggle = () => undefined,
}: Props): JSX.Element => {
    const handleChange = useCallback(
        (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
            console.log('--> newFormats', newFormats)
            handleToggle(newFormats)
        },
        [handleToggle]
    )
    console.log('--> toggle value', value)
    return (
        <ToggleButtonGroup
            value={value}
            // exclusive
            orientation={'horizontal'}
            aria-label={ariaLabel}
            className={classNames(styles.Root, className)}
            onChange={handleChange}
        >
            {map(
                items,
                (
                    { key, element, disabled = false }: ToggleGeneralItem,
                    index: number
                ) => (
                    <ToggleButton
                        value={key}
                        key={index}
                        disabled={disabled}
                        aria-label={key}
                    >
                        {element}
                    </ToggleButton>
                )
            )}
        </ToggleButtonGroup>
    )
}

Component.displayName = 'Input:Toggle.general'

export default Component
