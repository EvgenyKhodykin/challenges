import 'moment/min/locales'

import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import Amount from 'components/amount/amount'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { ORDER_STATUS } from '../../lib/orders/orders.const'
import OutlinedButton from '../buttons/outlined.general'
import DocumentIcon from '../icons/document'
import Product from './product.purchase'
import styles from './purchase.module.scss'
import type Props from './purchase-props.interface'
import SocialShare from './social-share.purchase'
import StatusPurchase from './status.purchase'

const PurchaseCompleted: React.FC<Props> = ({
    id,
    purchaseDate,
    paymentMethod,
    paymentCurrency,
    paidAmount,
    paidAmountCrypto,
    productName,
    productCurrency,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('purchases-list')
    const router = useRouter()
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <div className={classNames(styles.Root, className)}>
            {isDesktop && (
                <>
                    <div className={classNames(styles.Header)}>
                        <div className={classNames(styles.Left)}>
                            <div className={classNames(styles.Top)}>
                                <StatusPurchase status={ORDER_STATUS.COMPLETED} />
                                <div className={styles.Type}>{t('purchase.title')}</div>
                                <div className={styles.BulletDivider}>&middot;</div>
                                <div className={styles.Number}>{id}</div>
                            </div>
                            <div className={classNames(styles.Bottom)}>
                                <span className={styles.PurchaseDate}>
                                    {moment(purchaseDate)
                                        .locale(router.locale as string)
                                        .format('ll')}
                                </span>
                                <span className={styles.BulletDivider}>&middot;</span>
                                <Amount
                                    amount={paidAmount}
                                    amountCrypto={paidAmountCrypto || paidAmount}
                                    type={paymentMethod}
                                    currency={paymentCurrency}
                                />
                                <span className={styles.BulletDivider}>&middot;</span>
                                <span className={styles.PaymentMethod}>
                                    {paymentMethod}
                                </span>
                            </div>
                        </div>
                        <div className={classNames(styles.Right)}>
                            <OutlinedButton
                                className={styles.Button}
                                onClick={() => router.push(`/profile/purchases/${id}`)}
                            >
                                <DocumentIcon className={styles.Icon} />
                                {t('purchase.paid.buttonLabel')}
                            </OutlinedButton>
                        </div>
                    </div>
                    <div className={classNames(styles.Footer)}>
                        <Product name={productName} currency={productCurrency} />
                        <SocialShare />
                    </div>
                </>
            )}
            {!isDesktop && (
                <>
                    <div className={classNames(styles.Header)}>
                        <div className={styles.Top}>
                            <StatusPurchase status={ORDER_STATUS.COMPLETED} />
                            <SocialShare />
                        </div>
                        <div className={styles.Middle}>
                            <div className={styles.Type}>{t('purchase.title')}</div>
                            <div className={styles.BulletDivider}>&middot;</div>
                            <div className={styles.Number}>{id}</div>
                        </div>
                        <div className={styles.Bottom}>
                            <span className={styles.PurchaseDate}>
                                {moment(purchaseDate).format('D MMM YYYY')}
                            </span>
                            <span className={styles.BulletDivider}>&middot;</span>
                            <span className={styles.Amount}>
                                <span className={styles.AmountLabel}>
                                    {t('purchase.paidAmountLabel')}
                                </span>
                                <Amount
                                    amount={paidAmount}
                                    amountCrypto={paidAmountCrypto || paidAmount}
                                    type={paymentMethod}
                                    currency={paymentCurrency}
                                />
                            </span>
                            <span className={styles.BulletDivider}>&middot;</span>
                            <span className={styles.PaymentMethod}>{paymentMethod}</span>
                        </div>
                    </div>
                    <div className={classNames(styles.Footer)}>
                        <div className={styles.Top}>
                            <Product name={productName} currency={productCurrency} />
                        </div>
                        <div className={styles.Bottom}>
                            <OutlinedButton
                                className={styles.Button}
                                onClick={() => router.push(`/profile/purchases/${id}`)}
                            >
                                <DocumentIcon className={styles.Icon} />
                                {t('purchase.paid.buttonLabel')}
                            </OutlinedButton>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

PurchaseCompleted.displayName = 'Cards:Purchase.paid'

export default PurchaseCompleted
