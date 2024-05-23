import classNames from 'classnames'

import IconCurrency from '../icons/currency'
import styles from './product.purchase.module.scss'

export interface ProductPurchaseProps {
    name?: string
    currency?: string
    className?: string
    testId?: string
}

const ProductPurchase: React.FC<ProductPurchaseProps> = ({
    className,
    testId,
    name,
    currency,
}): JSX.Element => (
    <div
        className={classNames(styles.Product, className)}
        data-testid={testId ?? 'product-purchase'}
    >
        <span className={styles.Currency}>
            <IconCurrency variant={currency} />
        </span>
        <span className={styles.ProductName}>{name}</span>
    </div>
)

ProductPurchase.displayName = 'Cards:ProductPurchase'

export default ProductPurchase
