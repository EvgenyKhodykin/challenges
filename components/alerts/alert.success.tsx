import CheckIcon from '@mui/icons-material/Check'
import MuiAlert from '@mui/material/Alert'
import type { FunctionComponent } from 'react'

import styles from './alert.success.module.scss'
import type AlertProps from './alert-props.interface'

export type Props = Pick<AlertProps, 'message'>

const Alert: FunctionComponent<Props> = ({ message }: Props): JSX.Element => (
    <MuiAlert
        data-testid='alert-success'
        className={styles.Alert}
        icon={<CheckIcon />}
        severity={'success'}
    >
        {message}
    </MuiAlert>
)

Alert.displayName = 'Alert.success'

export default Alert
