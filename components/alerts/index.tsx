import Snackbar from '@mui/material/Snackbar'
import isNil from 'lodash/isNil'
import type { FunctionComponent } from 'react'

import AlertError from './alert.error'
import AlertSuccess from './alert.success'
import AlertWarning from './alert.warning'
import type Props from './alert-props.interface'

const Alert: FunctionComponent<Props> = ({
    variant,
    duration,
    visible,
    onClose,
    ...props
}: Props): JSX.Element => {
    if (duration && !isNil(onClose) && !isNil(visible)) {
        if (isNil(variant)) {
            return <div />
        }
        return (
            <Snackbar
                open={visible}
                onClose={onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
            >
                <div>
                    {variant === 'error' && <AlertError {...props} />}
                    {variant === 'success' && <AlertSuccess {...props} />}
                    {variant === 'warning' && <AlertWarning {...props} />}
                </div>
            </Snackbar>
        )
    }

    switch (variant) {
        case 'error':
            return <AlertError {...props} />
        case 'success':
            return <AlertSuccess {...props} />
        default:
            return <div />
    }
}

Alert.displayName = 'Alert'

export default Alert
