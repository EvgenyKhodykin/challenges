import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import MuiAlert from '@mui/material/Alert'
import type { FunctionComponent } from 'react'

import styles from './alert.warning.module.scss'
import type AlertProps from './alert-props.interface'

type Props = Pick<AlertProps, 'message'>

const Alert: FunctionComponent<Props> = ({ message }: Props): JSX.Element => (
    <MuiAlert
        data-testid='alert-warning'
        className={styles.Alert}
        icon={<ErrorOutlineIcon />}
        severity={'warning'}
    >
        {message}
    </MuiAlert>
)

Alert.displayName = 'Alert.warning'

export default Alert
