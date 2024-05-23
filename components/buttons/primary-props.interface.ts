import type TestIds from './primary-test-ids.interface'

export default interface PrimaryProps {
    variant?: 'async' | 'general' | 'print'
    children: React.ReactNode | string
    className?: string
    disabled?: boolean
    processing?: boolean
    printId?: string
    testIds?: TestIds
    onClick?: React.MouseEventHandler
}
