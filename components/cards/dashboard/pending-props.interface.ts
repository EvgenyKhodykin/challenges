import type Pending from '../../../lib/challenges/pending.interface'

export default interface PendingProps {
    data: Pending
    onComplete: (login: number) => void
    className?: string
}
