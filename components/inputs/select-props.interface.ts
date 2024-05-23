import type SelectItem from '../../lib/forms/select-item.interface'
import type InputTestIds from './input-test-ids.interface'

export default interface SelectProps {
    name: string
    onChange: React.ChangeEventHandler
    items: Array<SelectItem>
    id?: string
    className?: string
    value?: string
    label?: string
    error?: string
    touched?: boolean
    disabled?: boolean
    helper?: string
    testIds?: InputTestIds
    defaultValue?: string
}
