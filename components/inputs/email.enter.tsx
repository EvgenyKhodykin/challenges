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

import styles from './email.enter.module.scss'
import type EmailProps from './email-props.interface'

type Props = Omit<EmailProps, 'variant'>

const Email: FunctionComponent<Props> = ({
    id,
    className,
    name,
    value,
    label,
    error,
    touched,
    disabled,
    onChange,
    onBlur,
}: Props): JSX.Element => {
    const [focused, setFocused] = useState<boolean>(false)
    const hasError = !!error && !!touched && !focused
    return (
        <FormControl
            focused={focused}
            error={hasError}
            fullWidth
            variant={'filled'}
            className={classNames(styles.Wrapper, className)}
            data-testid='email-enter-control'
            disabled={disabled}
        >
            <InputLabel data-testid='email-enter-label' htmlFor={id}>
                {label}
            </InputLabel>
            <FilledInput
                id={id}
                type={'email'}
                name={name}
                value={value}
                disabled={disabled}
                onFocus={partial(setFocused, true)}
                onBlur={(event) => {
                    setFocused(false)
                    onBlur(event)
                }}
                onChange={onChange}
                inputProps={{
                    'data-testid': 'email-enter-input',
                }}
                endAdornment={
                    touched &&
                    !focused &&
                    !error && (
                        <InputAdornment position='end'>
                            <CheckIcon className={styles.CheckMark} />
                        </InputAdornment>
                    )
                }
            />
            {hasError && (
                <FormHelperText data-testid='email-enter-error' error>
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    )
}

Email.displayName = 'Input:Email.enter'

export default Email
