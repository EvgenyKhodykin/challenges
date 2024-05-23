import SearchIcon from '@mui/icons-material/Search'
import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import type InputProps from './input-props.interface'
import componentStyles from './text.enter.module.scss'

const Text: FunctionComponent<InputProps> = ({
    name,
    onChange,
    onBlur,
    className,
    value,
    label,
}: InputProps): JSX.Element => (
    <FormControl
        fullWidth
        variant={'filled'}
        className={classNames(componentStyles.Wrapper, className)}
    >
        <InputLabel>{label}</InputLabel>
        <FilledInput
            type={'text'}
            name={name}
            value={value}
            onBlur={(event) => {
                onBlur(event)
            }}
            onChange={onChange}
            endAdornment={
                <InputAdornment position='end'>
                    <SearchIcon />
                </InputAdornment>
            }
        />
    </FormControl>
)

Text.displayName = 'Input:Text.search'

export default Text
