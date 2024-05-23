import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select'
import classNames from 'classnames'
import map from 'lodash/map'

import type SelectItem from '../../lib/forms/select-item.interface'
import IconArrowDown from '../icons/arrow-down'
import inputStyles from './input.module.scss'
import componentStyles from './select.general.module.scss'
import type Props from './select-props.interface'

const Select: React.FC<Props> = ({
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
    defaultValue,
}: Props): JSX.Element => {
    const hasError = !!error && !!touched
    return (
        <FormControl
            error={hasError}
            className={classNames(inputStyles.Root, componentStyles.Root, className)}
            fullWidth
            variant={'filled'}
            disabled={disabled}
            data-testid={testIds?.control ?? 'select-general-control'}
        >
            <InputLabel
                data-testid={testIds?.label ?? 'select-general-label'}
                htmlFor={id}
            >
                {label}
            </InputLabel>
            <MuiSelect
                defaultValue={defaultValue}
                id={id}
                name={name}
                value={value}
                onChange={(event: SelectChangeEvent) => {
                    onChange(event as React.ChangeEvent)
                }}
                IconComponent={IconArrowDown}
                data-testid={testIds?.label ?? 'select-general-input'}
            >
                {map(
                    items,
                    ({ value, label }: SelectItem, index: number): JSX.Element => (
                        <MenuItem key={index} value={value}>
                            {label}
                        </MenuItem>
                    )
                )}
            </MuiSelect>
            {!!helper && !hasError && (
                <FormHelperText
                    data-testid={testIds?.helper ?? 'select-general-helper-text'}
                    className={classNames(inputStyles.HelperText)}
                >
                    {helper}
                </FormHelperText>
            )}
            {hasError && (
                <FormHelperText
                    data-testid={testIds?.error ?? 'select-general-error'}
                    error
                >
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    )
}

export default Select
