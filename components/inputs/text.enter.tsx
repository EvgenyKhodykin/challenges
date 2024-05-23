import CheckIcon from '@mui/icons-material/Check'
import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import classNames from 'classnames'
import partial from 'lodash/partial'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

import rootStyles from './input.module.scss'
import type InputProps from './input-props.interface'
import componentStyles from './text.enter.module.scss'

const Text: FunctionComponent<InputProps> = ({
    name,
    onChange,
    onBlur,
    id,
    className,
    value,
    label,
    error,
    touched,
    disabled,
    helper,
    testIds,
    placeholder,
    readOnly,
}: InputProps): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false)
    const hasError = !!error && !!touched && !focused

    return (
        <FormControl
            focused={focused}
            error={hasError}
            fullWidth
            variant={'filled'}
            className={classNames(componentStyles.Wrapper, className)}
            data-testid={testIds?.control ?? 'text-enter-control'}
            disabled={disabled}
        >
            <InputLabel data-testid={testIds?.label ?? 'text-enter-label'} htmlFor={id}>
                {label}
            </InputLabel>
            <FilledInput
                id={id}
                type={'text'}
                name={name}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                onFocus={partial(setFocused, true)}
                onBlur={(event) => {
                    setFocused(false)
                    onBlur(event)
                }}
                readOnly={readOnly}
                onChange={onChange}
                inputProps={{
                    'data-testid': testIds?.input ?? 'text-enter-input',
                }}
                endAdornment={
                    <InputAdornment position='end'>
                        {touched && !focused && !error && (
                            <CheckIcon className={componentStyles.CheckMark} />
                        )}
                    </InputAdornment>
                }
            />
            {!!helper && !hasError && (
                <FormHelperText
                    data-testid={testIds?.helper ?? 'text-enter-helper-text'}
                    className={classNames(rootStyles.HelperText)}
                >
                    {helper}
                </FormHelperText>
            )}
            {hasError && (
                <FormHelperText data-testid={testIds?.error ?? 'text-enter-error'} error>
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    )
}

Text.displayName = 'Input:Text.enter'

export default Text
