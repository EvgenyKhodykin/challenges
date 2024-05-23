import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import { useCallback, useMemo } from 'react'

import type SelectItem from '../../lib/forms/select-item.interface'
import IconArrowDown from '../icons/arrow-down'
import master from './input.module.scss'
import variant from './select.rounded.module.scss'
import type Props from './select-props.interface'

const Component: React.FC<Props> = ({
    name,
    onChange,
    items,
    id,
    label,
    value,
    error,
    touched,
    disabled,
    className,
    helper,
    testIds,
}: Props): JSX.Element => {
    const hasError = useMemo(() => !!error && !!touched, [error, touched])
    const isLabelShown = useMemo(() => label && !isEmpty(label), [label])
    const isHelperTextShown = useMemo(() => !!helper && !hasError, [helper, hasError])

    const handleChange = useCallback(
        (event: SelectChangeEvent) => {
            onChange(event as React.ChangeEvent)
        },
        [onChange]
    )

    return (
        <FormControl
            error={hasError}
            className={classNames(master.Root, variant.Root, className, {
                [variant.LabelLess]: !isLabelShown,
            })}
            fullWidth
            variant={'filled'}
            disabled={disabled}
            data-testid={testIds?.control ?? 'select-rounded-control'}
        >
            {isLabelShown && (
                <InputLabel
                    data-testid={testIds?.label ?? 'select-rounded-label'}
                    htmlFor={id}
                >
                    {label}
                </InputLabel>
            )}
            <MuiSelect
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                IconComponent={IconArrowDown}
                data-testid={testIds?.label ?? 'select-rounded-input'}
                MenuProps={{
                    classes: {
                        paper: classNames(variant.Paper, {
                            [variant.LabelLess]: !isLabelShown,
                        }),
                        list: variant.List,
                    },
                }}
            >
                {map(
                    items,
                    ({ value, label }: SelectItem, index: number): JSX.Element => (
                        <MenuItem key={index} value={value} className={variant.Item}>
                            {label}
                        </MenuItem>
                    )
                )}
            </MuiSelect>
            {isHelperTextShown && (
                <FormHelperText
                    data-testid={testIds?.helper ?? 'select-rounded-helper-text'}
                    className={classNames(master.HelperText)}
                >
                    {helper}
                </FormHelperText>
            )}
            {hasError && (
                <FormHelperText
                    data-testid={testIds?.error ?? 'select-rounded-error'}
                    error
                >
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    )
}

Component.displayName = 'Inputs:Select.rounded'

export default Component
