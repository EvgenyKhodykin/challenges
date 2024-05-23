import CheckIcon from '@mui/icons-material/Check'
import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import classNames from 'classnames'
import partial from 'lodash/partial'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

import Visibility from '../icons/visibility'
import VisibilityOff from '../icons/visibility-off'
import rootStyles from './input.module.scss'
import type InputProps from './input-props.interface'
import styles from './password.enter.module.scss'

const Password: FunctionComponent<InputProps> = ({
    id,
    className,
    name,
    value,
    label,
    error,
    touched,
    testIds,
    helper,
    disabled,
    onChange,
    onBlur,
}: InputProps): JSX.Element => {
    const [visibility, setVisibility] = useState<boolean>(false)
    const [focused, setFocused] = useState<boolean>(false)
    const hasError = !!error && !!touched && !focused
    return (
        <FormControl
            focused={focused}
            error={!!error && !!touched && !focused}
            fullWidth
            variant={'filled'}
            data-testid={testIds?.control ?? 'password-enter-control'}
            className={classNames(styles.Wrapper, className)}
            disabled={disabled}
        >
            <InputLabel
                data-testid={testIds?.label ?? 'password-enter-label'}
                htmlFor={id}
            >
                {label}
            </InputLabel>
            <FilledInput
                type={visibility ? 'text' : 'password'}
                name={name}
                value={value}
                fullWidth
                onFocus={partial(setFocused, true)}
                onBlur={(event) => {
                    setFocused(false)
                    onBlur(event)
                }}
                onChange={onChange}
                inputProps={{
                    'data-testid': testIds?.input ?? 'password-enter-input',
                    autoComplete: id,
                    id: id,
                }}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={partial(setVisibility, !visibility)}
                            edge='end'
                        >
                            {visibility ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        {touched && !focused && !error && (
                            <CheckIcon className={styles.CheckMark} />
                        )}
                    </InputAdornment>
                }
            />
            {!!helper && !hasError && (
                <FormHelperText
                    data-testid={testIds?.helper ?? 'password-enter-helper-text'}
                    className={classNames(rootStyles.HelperText)}
                >
                    {helper}
                </FormHelperText>
            )}
            {hasError && (
                <FormHelperText
                    data-testid={testIds?.error ?? 'password-enter-error'}
                    error
                >
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    )
}

Password.displayName = 'Input:Password.enter'

export default Password
