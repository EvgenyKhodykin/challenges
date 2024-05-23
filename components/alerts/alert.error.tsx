import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import MuiAlert from '@mui/material/Alert'
import type { FunctionComponent } from 'react'

import styles from './alert.error.module.scss'
import type AlertProps from './alert-props.interface'

type Props = Pick<AlertProps, 'message'>

const Alert: FunctionComponent<Props> = ({ message }: Props): JSX.Element => (
    <MuiAlert
        data-testid='alert-error'
        className={styles.Alert}
        icon={<WarningAmberIcon />}
        severity={'error'}
    >
        {message}
    </MuiAlert>
)

Alert.displayName = 'Alert.error'

export default Alert
