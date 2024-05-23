export default interface ContainerProps {
    variant?: 'profile'
    isShown?: boolean
    handleClose?: React.MouseEventHandler
    className?: string
    children?: React.ReactNode
}
