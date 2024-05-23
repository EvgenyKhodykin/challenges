import type { SnackbarCloseReason } from '@mui/material'

export default interface AlertProps {
    variant?: 'error' | 'success' | 'warning'
    message: string
    duration?: number
    visible?: boolean
    onClose?: (event: Event | React.SyntheticEvent, reason: SnackbarCloseReason) => void
}
