/* eslint-disable react-hooks/exhaustive-deps */
import 'moment/min/locales'

import Grid from '@mui/material/Grid'
import classNames from 'classnames'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useContext } from 'react'

import Client from '../../lib/client/client.interface'
import type Order from '../../lib/orders/order.interface'
import UserContext from '../../lib/user/user.context'
import Address from '../address/address'
import Amount from '../amount/amount'
import Coupon from './coupon'
import styles from './receipt.module.scss'

export interface TestIds {
    root?: string
}

export interface Props {
    order: Order
    client: Client
    className?: string
    testIds?: TestIds
}

const Receipt: React.FC<Props> = ({
    order,
    client,
    className,
    testIds,
}: Props): JSX.Element => {
    const user = useContext(UserContext)
    const { t } = useTranslation('purchases-details')
    const router = useRouter()

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'receipt'}
        >
            <div className={styles.CompanyInfo}>
                <div className={styles.CompanyName}>{client.name}</div>
                <Address className={styles.CompanyAddress} address={client.address} />
                <div className={styles.CompanyWebsite}>
                    <a href={`//${client.websiteUrl}`} target='_blank' rel='noreferrer'>
                        {client.websiteUrl}
                    </a>
                </div>
            </div>
            <div className={styles.PurchaseInfo}>
                <div className={styles.SoldTo}>
                    <span className={styles.Label}>{t('receipt.soldTo')}</span>
                    <span className={styles.Data}>{user.user?.fullName}</span>
                </div>
                <div className={styles.OrderInfo}>
                    <div className={styles.OrderDate}>
                        <span className={styles.Label}>{t('receipt.date')}</span>
                        <span className={styles.Data}>
                            {moment(order.purchaseDate)
                                .locale(router.locale as string)
                                .format('ll')}
                        </span>
                    </div>
                    <div className={styles.OrderDate}>
                        <span className={styles.Label}>{t('receipt.orderNumber')}</span>
                        <span className={styles.Data}>{order.id}</span>
                    </div>
                </div>
            </div>
            <div className={styles.LineItems}>
                <Grid container spacing={0} className={styles.Container}>
                    <Grid item md={4} className={styles.TH}>
                        {t('receipt.tableHeaders.item')}
                    </Grid>
                    <Grid item md={3} className={styles.TH}>
                        {t('receipt.tableHeaders.quantity')}
                    </Grid>
                    <Grid item md={3} className={styles.TH}>
                        {t('receipt.tableHeaders.unitPrice')}
                    </Grid>
                    <Grid item md={2} className={styles.TH}>
                        {t('receipt.tableHeaders.amount')}
                    </Grid>
                </Grid>
                {order.products.map((product, index) => (
                    <Grid key={index} container spacing={0} className={styles.Container}>
                        <Grid
                            item
                            md={4}
                            className={classNames(styles.TD, styles.ProductName)}
                        >
                            {product.name}
                        </Grid>
                        <Grid item md={3} className={styles.TD}>
                            {product.quantity}
                        </Grid>
                        <Grid item md={3} className={styles.TD}>
                            <Amount amount={product.price} superscript={true} />
                        </Grid>
                        <Grid item md={2} className={styles.TD}>
                            <Amount
                                amount={product.price * product.quantity}
                                superscript={true}
                            />
                        </Grid>
                    </Grid>
                ))}
            </div>
            <div className={styles.Totals}>
                <Grid container spacing={0} className={styles.Container}>
                    <Grid item xs={5} md={9} className={styles.TH}>
                        {t('receipt.subtotal')}
                    </Grid>
                    <Grid item xs={7} md={3} className={styles.TD}>
                        <Amount amount={order.subTotalAmount} superscript={true} />
                    </Grid>
                </Grid>
                {order.discountAmount > 0 && (
                    <Grid container spacing={0} className={styles.Container}>
                        <Grid
                            item
                            xs={5}
                            md={9}
                            className={classNames(styles.TH, styles.Discount)}
                        >
                            <span> {t('receipt.discount')}</span>
                            <span className={styles.Coupon}>
                                {order.coupons.map((coupon, i) => (
                                    <Coupon couponCode={coupon} key={i} />
                                ))}
                            </span>
                        </Grid>
                        <Grid item xs={7} md={3} className={styles.TD}>
                            <Amount amount={order.discountAmount} superscript={true} />
                        </Grid>
                    </Grid>
                )}
                <Grid container spacing={0} className={styles.Container}>
                    <Grid item xs={5} md={9} className={classNames(styles.TH)}>
                        {t('receipt.total')}
                    </Grid>
                    <Grid item xs={7} md={3} className={classNames(styles.TD)}>
                        <Amount amount={order.totalAmount} superscript={true} />
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={styles.Container}>
                    <Grid
                        item
                        xs={5}
                        md={9}
                        className={classNames(styles.TH, styles.TotalPaid)}
                    >
                        {t('receipt.totalPaid')}
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        md={3}
                        className={classNames(styles.TD, styles.TotalPaid)}
                    >
                        <Amount
                            amount={order.paidAmount}
                            amountCrypto={order.paidAmountCrypto || order.paidAmount}
                            type={order.paymentMethod}
                            currency={order.paymentCurrency}
                            className={styles.TotalPaidAmount}
                            superscript={true}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

Receipt.displayName = 'Receipt'

export default Receipt
