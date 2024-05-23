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
import { useRef, useState } from 'react'

import Visibility from '../icons/visibility'
import VisibilityOff from '../icons/visibility-off'
import PasswordStrength from '../interactivity/password-strength'
import PasswordRules from '../popovers/password-rules'
import type InputProps from './input-props.interface'
import styles from './password.new.module.scss'

const Password: FunctionComponent<InputProps> = ({
    id,
    className,
    name,
    value,
    label,
    error,
    touched,
    onChange,
    onBlur,
}: InputProps): JSX.Element => {
    const [visibility, setVisibility] = useState<boolean>(false)
    const [focused, setFocused] = useState<boolean>(false)
    const hasError = !!error && !!touched && !focused

    const containerRef = useRef<HTMLDivElement>(null)
    const [anchorEl, setAnchorElement] = useState<HTMLInputElement | null>(null)
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setAnchorElement(event.currentTarget)
        setFocused(true)
    }
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false)
        onBlur(event)
        setAnchorElement(null)
    }

    const open = Boolean(anchorEl)
    const ariaDescribedby = open ? 'password-new-popup' : undefined

    return (
        <FormControl
            className={classNames(styles.Wrapper, className)}
            focused={focused}
            error={!!error && !!touched && !focused}
            fullWidth
            variant={'filled'}
            data-testid='password-new-control'
        >
            <InputLabel data-testid='password-new-label' htmlFor={id}>
                {label}
            </InputLabel>
            <FilledInput
                ref={containerRef}
                type={visibility ? 'text' : 'password'}
                name={name}
                value={value}
                fullWidth
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                inputProps={{
                    'data-testid': 'password-new-input',
                    'aria-describedby': ariaDescribedby,
                    autoComplete: id,
                    id: id,
                }}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            data-testid='password-new-visibility'
                            aria-label='toggle password visibility'
                            onClick={partial(setVisibility, !visibility)}
                            edge='end'
                        >
                            {visibility ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        {(!touched || focused || !!error) && (
                            <PasswordStrength
                                password={value}
                                className={styles.PasswordStrength}
                            />
                        )}
                        {touched && !focused && !error && (
                            <CheckIcon className={styles.CheckMark} />
                        )}
                    </InputAdornment>
                }
            />
            <PasswordRules
                password={value}
                anchor={anchorEl}
                containerRef={containerRef}
                ariaDescribedby={ariaDescribedby}
                onClose={partial(setAnchorElement, null)}
            />
            {hasError && (
                <FormHelperText data-testid='password-new-error' error>
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    )
}

Password.displayName = 'Input:Password.new'

export default Password
