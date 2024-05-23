/* eslint-disable react-hooks/exhaustive-deps */
import 'moment/min/locales'

import IconCollapseOpen from '@mui/icons-material/AddOutlined'
import IconCheck from '@mui/icons-material/Check'
import IconCollapseClose from '@mui/icons-material/RemoveOutlined'
import type { Theme } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { useFormik } from 'formik'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useMemo, useReducer } from 'react'

import { INPUT_COUPON, INPUT_PAYMENT_METHOD } from '../../lib/forms/forms.const'
import type { ChallengeJoin as FormValues } from '../../lib/forms/initial-values.interface'
import type Product from '../../lib/products/product.interface'
import type Price from '../../lib/utils/price.interface'
import Amount from '../amount/amount'
import ButtonClose from '../buttons/close'
import ButtonGeneral from '../buttons/primary.general'
import IconUSA from '../icons/usa'
import InputText from '../inputs/text.enter'
import PaymentCard from '../sections/challenge-join/payment.card'
import PaymentCrypto from '../sections/challenge-join/payment.crypto'
import PaymentPaypal from '../sections/challenge-join/payment.paypal'
import styles from './challenge-join.module.scss'

export enum Actions {
    COUPON_OPEN,
    COUPON_CLOSE,
    COUPON_CHANGE,
    PRODUCT_ID_CHANGE,
    PAYMENT_SHOW,
}

export type Action =
    | {
          type: Actions.COUPON_OPEN
      }
    | {
          type: Actions.COUPON_CLOSE
      }
    | {
          type: Actions.PRODUCT_ID_CHANGE
          data: string
      }
    | {
          type: Actions.COUPON_CHANGE
          data: number
      }
    | {
          type: Actions.PAYMENT_SHOW
      }

export interface State {
    isCouponCollapsed: boolean
    isPaymentShown: boolean
    productID: string
    couponDiscount: number
}

export const reducer: React.Reducer<State, Action> = (
    state: State,
    action: Action
): State => {
    switch (action.type) {
        case Actions.COUPON_OPEN: {
            return {
                ...state,
                isCouponCollapsed: true,
            }
        }
        case Actions.COUPON_CLOSE: {
            return {
                ...state,
                isCouponCollapsed: false,
            }
        }
        case Actions.PRODUCT_ID_CHANGE: {
            return {
                ...state,
                isCouponCollapsed: false,
                isPaymentShown: false,
                couponDiscount: 0,
                productID: action.data,
            }
        }
        case Actions.COUPON_CHANGE: {
            return {
                ...state,
                couponDiscount: action.data,
            }
        }
        case Actions.PAYMENT_SHOW: {
            return {
                ...state,
                isPaymentShown: true,
            }
        }
        default:
            throw new Error(`Unknown action type`)
    }
}

export interface Props {
    data: Product
}

const Component: React.FC<Props> = ({ data }: Props): JSX.Element => {
    const { t } = useTranslation('challenge-join')
    const router = useRouter()
    const theme: Theme = useTheme<Theme>()
    const [state, dispatch] = useReducer(reducer, {
        isCouponCollapsed: false,
        productID: data.id,
        couponDiscount: 0,
        isPaymentShown: false,
    })

    const discountPercent: string = useMemo(
        () => (state.couponDiscount * 100).toFixed(0),
        [state.couponDiscount]
    )

    const discount: Price = useMemo(
        () => ({
            amount: 250 * state.couponDiscount, // @todo replace with data from api
            currency: 'USD',
        }),
        [state.couponDiscount]
    )

    const total: Price = useMemo(
        () => ({
            amount: 250 - discount.amount, // @todo replace with data from api
            currency: 'USD',
        }),
        [state.couponDiscount]
    )

    const formik = useFormik({
        initialValues: {
            [INPUT_COUPON]: '',
            [INPUT_PAYMENT_METHOD]: '',
        },
        onSubmit: async (values: FormValues) => {
            console.log('--> values', values)
            return
        },
    })

    const handleCouponToggle = () => {
        if (!state.isCouponCollapsed) {
            dispatch({ type: Actions.COUPON_OPEN })
        } else {
            dispatch({ type: Actions.COUPON_CLOSE })
        }
        cycleCoupon()
    }

    const handleCouponApply = () => {
        // @todo apply real coupon data
        dispatch({ type: Actions.COUPON_CHANGE, data: 0.15 })
    }

    const handleCouponRemove = () => {
        formik.resetForm()
        dispatch({ type: Actions.COUPON_CHANGE, data: 0 })
    }

    const handleProceedPayment = () => {
        dispatch({ type: Actions.PAYMENT_SHOW })
    }

    const [coupon, cycleCoupon] = useCycle({ height: 64 }, { height: 126 })

    const isCryptoIconsShown: boolean =
        useMediaQuery(theme.breakpoints.up('md')) &&
        formik.values[INPUT_PAYMENT_METHOD] !== 'crypto'

    useEffect(() => {
        const couponValue = formik.values[INPUT_COUPON]
        console.log('--> value', couponValue)
        if (state.productID !== data.id) {
            formik.resetForm()
            if (state.isCouponCollapsed) {
                cycleCoupon()
            }
            dispatch({ type: Actions.PRODUCT_ID_CHANGE, data: data.id })
        }
    }, [data.id])

    return (
        <>
            <h2 className={styles.Title}>{t('rightBoard.header')}</h2>
            <div className={styles.Summary}>
                <div className={styles.Header}> {t('common.challenge')}</div>
                <div className={styles.Balance}>
                    <span className={styles.Label}> {t('common.balance')}:</span>
                    <IconUSA className={styles.Icon} />
                    <Amount
                        amount={data.account.amount}
                        currency={data.account.currency}
                        className={styles.BalanceAmount}
                        position={'append'}
                        superscript
                        kilo
                    />
                </div>
                <div className={styles.Attribute}>
                    <span className={styles.Label}> {t('common.riskMode')}:</span>
                    <span className={styles.Value}>
                        {' '}
                        {t('rightBoard.challengeInfo.normal')}
                    </span>
                </div>
                <div className={styles.Attribute}>
                    <span className={styles.Label}> {t('common.profitTarget')}:</span>
                    <span className={styles.Value}>
                        10%&nbsp;
                        <Amount
                            amount={2500}
                            currency={'USD'}
                            position={'append'}
                            className={styles.TargetAmount}
                            superscript
                        />
                    </span>
                </div>
                <div className={styles.Attribute}>
                    <span className={styles.Label}>
                        {' '}
                        {t('rightBoard.challengeInfo.duration')}
                    </span>
                    <span className={styles.Value}>
                        {' '}
                        {t('common:daysCount', {
                            count: 30,
                        })}
                    </span>
                </div>
                <div className={styles.Attribute}>
                    <span className={styles.Label}>
                        {t('rightBoard.challengeInfo.endDate')}
                    </span>
                    <span className={styles.Value}>
                        {moment('09.08.2022')
                            .locale(router.locale as string)
                            .format('ll')}
                    </span>
                </div>
            </div>
            <motion.div
                animate={coupon}
                className={styles.Coupon}
                transition={{ duration: 0.2, ease: 'linear' }}
            >
                <div className={styles.Toggler}>
                    {state.couponDiscount === 0 && (
                        <>
                            <span className={styles.Label}>
                                {t('rightBoard.couponCode.inputMessage')}
                            </span>
                            <IconButton
                                onClick={handleCouponToggle}
                                className={styles.Button}
                            >
                                {!state.isCouponCollapsed && (
                                    <IconCollapseOpen className={styles.IconCollapse} />
                                )}
                                {state.isCouponCollapsed && (
                                    <IconCollapseClose className={styles.IconCollapse} />
                                )}
                            </IconButton>
                        </>
                    )}
                    {state.couponDiscount !== 0 && (
                        <>
                            <span className={styles.Label}>
                                {t('rightBoard.couponCode.inputLabel')}
                            </span>
                            <ButtonClose
                                onPress={handleCouponRemove}
                                className={styles.Button}
                            />
                        </>
                    )}
                </div>
                <AnimatePresence initial={false}>
                    {state.isCouponCollapsed && (
                        <motion.div
                            className={styles.Collapse}
                            key={'collapsed'}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {state.couponDiscount === 0 && (
                                <>
                                    <InputText
                                        value={formik.values[INPUT_COUPON]}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        name={INPUT_COUPON}
                                        placeholder={t(
                                            'rightBoard.couponCode.inputLabel'
                                        )}
                                        className={styles.Input}
                                    />
                                    <ButtonGeneral
                                        disabled={isEmpty(formik.values[INPUT_COUPON])}
                                        className={styles.Button}
                                        onClick={handleCouponApply}
                                    >
                                        {t('rightBoard.couponCode.buttonLabel')}
                                    </ButtonGeneral>
                                </>
                            )}
                            {state.couponDiscount !== 0 && (
                                <div className={styles.Applied}>
                                    <IconCheck className={styles.Icon} />
                                    <span className={styles.Text}>
                                        {t('rightBoard.couponCode.discountMessage.part1')}{' '}
                                        {formik.values[INPUT_COUPON]}{' '}
                                        {t('rightBoard.couponCode.discountMessage.part2')}{' '}
                                        {discountPercent}%{' '}
                                        {t(
                                            'rightBoard.couponCode.discountMessage.discount'
                                        )}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            {state.couponDiscount > 0 && (
                <div className={styles.Discount}>
                    <table>
                        <tbody>
                            <tr>
                                <td className={styles.Label}>
                                    {' '}
                                    {t('rightBoard.couponCode.subtotal')}
                                </td>
                                <td className={styles.Value}>
                                    <Amount
                                        amount={250}
                                        currency={'USD'}
                                        position={'append'}
                                        className={styles.Amount}
                                        superscript
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.Label}>
                                    {`${t(
                                        'rightBoard.couponCode.couponDiscount'
                                    )} ${discountPercent}%:`}
                                </td>
                                <td className={styles.Value}>
                                    <Amount
                                        amount={discount.amount}
                                        currency={discount.currency}
                                        position={'append'}
                                        className={styles.Amount}
                                        superscript
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className={styles.Total}>
                <div className={styles.Left}>{t('rightBoard.paymentMessage')}</div>
                <div className={styles.Right}>
                    <Amount
                        className={styles.Amount}
                        amount={total.amount}
                        currency={total.currency}
                        position={'append'}
                        superscript
                    />
                </div>
            </div>
            <AnimatePresence initial={false} mode='wait'>
                {!state.isPaymentShown && (
                    <motion.div
                        key={'button'}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.PaymentButton}
                    >
                        <ButtonGeneral onClick={handleProceedPayment}>
                            {t('rightBoard.paymentButtonLabel')}
                        </ButtonGeneral>
                        <small className={styles.Text}>
                            {t('rightBoard.paymentInfo')}{' '}
                            <Link href={'#'}>{t('rightBoard.termsOfUse')}</Link>.
                        </small>
                    </motion.div>
                )}
                {state.isPaymentShown && (
                    <motion.div
                        key={'payment'}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.Payment}
                    >
                        <FormControl className={styles.PaymentForm}>
                            <RadioGroup
                                value={formik.values[INPUT_PAYMENT_METHOD]}
                                onChange={formik.handleChange}
                                name={INPUT_PAYMENT_METHOD}
                            >
                                <AnimatePresence initial={false} mode='wait'>
                                    <div key={'crypto-radio'} className={styles.Toggler}>
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={'crypto'}
                                            label={t(
                                                'rightBoard.paymentOptions.crypto.label'
                                            )}
                                        />
                                        {isCryptoIconsShown && (
                                            <div className={styles.Logos}>
                                                <span className={styles.Bitcoin} />
                                                <span className={styles.Etherium} />
                                                <span className={styles.Lightcoin} />
                                                <span className={styles.Dogecoin} />
                                                <span className={styles.Tether} />
                                                <span className={styles.USDCoin} />
                                            </div>
                                        )}
                                    </div>
                                    {formik.values[INPUT_PAYMENT_METHOD] === 'crypto' && (
                                        <PaymentCrypto />
                                    )}
                                    <div
                                        key={'card-radio'}
                                        className={classNames(
                                            styles.Toggler,
                                            styles.Bordered
                                        )}
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={'card'}
                                            label={t(
                                                'rightBoard.paymentOptions.card.label'
                                            )}
                                        />
                                        <div className={styles.Logos}>
                                            <span className={styles.Visa} />
                                            <span className={styles.Mastercard} />
                                        </div>
                                    </div>
                                    {formik.values[INPUT_PAYMENT_METHOD] === 'card' && (
                                        <PaymentCard />
                                    )}
                                    <div
                                        key={'paypal-radio'}
                                        className={classNames(
                                            styles.Toggler,
                                            styles.Bordered
                                        )}
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={'paypal'}
                                            label={t(
                                                'rightBoard.paymentOptions.payPal.label'
                                            )}
                                        />
                                        <div className={styles.Logos}>
                                            <span className={styles.PayPal} />
                                        </div>
                                    </div>
                                    {formik.values[INPUT_PAYMENT_METHOD] === 'paypal' && (
                                        <PaymentPaypal className={styles.PayPalSection} />
                                    )}
                                </AnimatePresence>
                            </RadioGroup>
                        </FormControl>
                        <Link className={styles.Link} href={'#'}>
                            {t('rightBoard.termsOfUse')}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

Component.displayName = 'Forms:ChallengeJoin'

export default Component
