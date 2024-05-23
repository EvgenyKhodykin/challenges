export default interface EmailProps {
    name: string
    onChange: React.ChangeEventHandler
    onBlur: React.FocusEventHandler
    variant?: 'enter'
    id?: string
    className?: string
    value?: string
    label?: string
    error?: string
    touched?: boolean
    disabled?: boolean
    helper?: string
}
