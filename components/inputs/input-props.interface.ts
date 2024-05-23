import type InputTestIds from './input-test-ids.interface'

export default interface InputProps {
    name: string
    onChange: React.ChangeEventHandler
    onBlur: React.FocusEventHandler
    id?: string
    className?: string
    value?: string
    label?: string
    error?: string
    touched?: boolean
    disabled?: boolean
    helper?: string
    testIds?: InputTestIds
    placeholder?: string
    readOnly?: boolean
}
