import 'moment/min/locales'

import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { ORDER_STATUS } from 'lib/orders/orders.const'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Amount from '../amount/amount'
import PrimaryButton from '../buttons/primary.general'
import Product from './product.purchase'
import styles from './purchase.module.scss'
import variant from './purchase.underpaid.module.scss'
import type Props from './purchase-props.interface'
import SocialShare from './social-share.purchase'
import StatusPurchase from './status.purchase'

const PurchaseUnderpaid: React.FC<Props> = ({
    id,
    totalAmount,
    paidAmount,
    paidAmountCrypto,
    purchaseDate,
    paymentMethod,
    paymentCurrency,
    productName,
    productCurrency,
    className,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const { t } = useTranslation('purchases-list')
    const router = useRouter()

    return (
        <div className={classNames(styles.Root, className)}>
            {isDesktop && (
                <>
                    <div className={classNames(styles.Header, variant.Header)}>
                        <div className={classNames(styles.Left, variant.Left)}>
                            <div className={classNames(styles.Top, variant.Top)}>
                                <StatusPurchase status={ORDER_STATUS.UNDERPAID} />
                                <div className={styles.Type}>{t('purchase.title')}</div>
                                <div className={styles.BulletDivider}>&middot;</div>
                                <div className={styles.Number}>{id}</div>
                            </div>
                            <div className={classNames(styles.Bottom, variant.Bottom)}>
                                <span className={styles.PurchaseDate}>
                                    {moment(purchaseDate)
                                        .locale(router.locale as string)
                                        .format('ll')}
                                </span>
                                <span className={styles.BulletDivider}>&middot;</span>
                                <span className={styles.AmountLabel}>
                                    {t('purchase.paidAmountLabel')}
                                </span>
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
                        <div className={classNames(styles.Right, variant.Right)}>
                            <PrimaryButton className={styles.Button}>
                                {t('purchase.underpaid.buttonLabel')}
                            </PrimaryButton>
                            <div
                                className={classNames(
                                    styles.UnderpaidAmount,
                                    variant.UnderpaidAmount
                                )}
                            >
                                {t('purchase.underpaid.remainingAmount')} {'$'}
                                {(totalAmount - paidAmount).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div className={classNames(styles.Footer, variant.Footer)}>
                        <Product name={productName} currency={productCurrency} />
                        <SocialShare />
                    </div>
                </>
            )}
            {!isDesktop && (
                <>
                    <div className={classNames(styles.Header, variant.Header)}>
                        <div className={styles.Top}>
                            <StatusPurchase status={ORDER_STATUS.UNDERPAID} />
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
                                <span className={styles.PaidAmount}>
                                    {paidAmount} {paymentCurrency}
                                </span>
                            </span>
                            <span className={styles.BulletDivider}>&middot;</span>
                            <span className={styles.PaymentMethod}>{paymentMethod}</span>
                        </div>
                    </div>
                    <div className={classNames(styles.Footer, variant.Footer)}>
                        <div className={styles.Top}>
                            <Product name={productName} currency={productCurrency} />
                        </div>
                        <div className={styles.Bottom}>
                            <PrimaryButton className={styles.Button}>
                                {t('purchase.underpaid.buttonLabel')}
                            </PrimaryButton>
                            <div
                                className={classNames(
                                    styles.UnderpaidAmount,
                                    variant.UnderpaidAmount
                                )}
                            >
                                {t('purchase.underpaid.remainingAmount')} {'$'}
                                {(totalAmount - paidAmount).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

PurchaseUnderpaid.displayName = 'Cards:Purchase.underpaid'

export default PurchaseUnderpaid
