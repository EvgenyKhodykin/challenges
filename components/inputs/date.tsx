import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import classNames from 'classnames'
import moment from 'moment'

import variant from './date.module.scss'
import master from './input.module.scss'

export interface Props {
    className?: string
    label?: string
    value: typeof moment | null
    onChange: (
        value: typeof moment | null,
        keyboardInputValue?: string | undefined
    ) => void
}

const Component: React.FC<Props> = ({
    value,
    onChange,
    label,
    className,
}: Props): JSX.Element => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(props) => <TextField {...props} />}
            className={classNames(master.Root, variant.Root, className)}
        />
    </LocalizationProvider>
)

export default Component
