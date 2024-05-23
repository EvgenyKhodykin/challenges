import PurchaseCompleted from './purchase.completed'
import PurchaseError from './purchase.error'
import PurchaseExpired from './purchase.expired'
import PurchaseUnderpaid from './purchase.underpaid'
import type PurchaseProps from './purchase-props.interface'

export type Variant =
    | 'pending'
    | 'processing'
    | 'completed'
    | 'refunded'
    | 'expired'
    | 'error'
    | 'underpaid'

export interface Props extends PurchaseProps {
    variant: Variant
}

const Purchase: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'completed':
            return <PurchaseCompleted {...props} />
        case 'underpaid':
            return <PurchaseUnderpaid {...props} />
        case 'error':
            return <PurchaseError {...props} />
        case 'expired':
            return <PurchaseExpired {...props} />
        default:
            return <></>
    }
}

Purchase.displayName = 'Cards:Purchase'

export default Purchase
