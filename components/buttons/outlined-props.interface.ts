export default interface OutlinedProps {
    variant?: 'general' | 'download' | 'link'
    onClick?: React.MouseEventHandler
    className?: string
    children?: React.ReactNode | string
    disabled?: boolean
    href?: string
}
