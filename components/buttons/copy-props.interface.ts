import type { ClipboardTestIds } from './copy-test-ids.interface'

export default interface CopyProps {
    handleCopy: React.MouseEventHandler
    className?: string
    copied?: boolean
    testIds?: ClipboardTestIds // May be also different types
}
