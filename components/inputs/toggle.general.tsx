import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import classNames from 'classnames'
import map from 'lodash/map'

import type { ToggleGeneralItem } from '../../lib/utils/toggle-items.interface'
import master from './toggle.module.scss'
import type ToggleProps from './toggle-props.interface'

export type Props = Pick<
    ToggleProps<ToggleGeneralItem>,
    'value' | 'items' | 'className' | 'ariaLabel' | 'handleToggle'
>

const Component: React.FC<Props> = ({
    value,
    items,
    ariaLabel,
    className,
    handleToggle = () => undefined,
}: Props): JSX.Element => (
    <ToggleButtonGroup
        value={value}
        exclusive
        orientation={'horizontal'}
        aria-label={ariaLabel}
        className={classNames(master.Root, className)}
    >
        {map(
            items,
            ({ key, element, disabled = false }: ToggleGeneralItem, index: number) => (
                <ToggleButton
                    onClick={() => handleToggle(key)}
                    value={key}
                    key={index}
                    disabled={disabled}
                >
                    {element}
                </ToggleButton>
            )
        )}
    </ToggleButtonGroup>
)

Component.displayName = 'Input:Toggle.general'

export default Component
