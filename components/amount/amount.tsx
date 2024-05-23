/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import { useEffect, useState } from 'react'

import { formatAmount, formatAmountCrypto, formatCurrency } from '../../lib/utils/amount'
import { ZERO_AMOUNT } from '../../lib/utils/currency.const'
import styles from './amount.module.scss'

export interface State {
    amount: string
    currency: string
}

export interface TestIds {
    root?: string
    amount?: string
    currency?: string
}

export interface Props {
    amount?: number | null
    amountCrypto?: number | null
    autoRounding?: boolean
    rounding?: number
    kilo?: boolean
    currency?: string
    type?: string
    format?: 'code' | 'symbol'
    position?: 'prepend' | 'append'
    superscript?: boolean
    zeroAmount?: string
    locale?: string
    className?: string
    testIds?: TestIds
}

const Amount: React.FC<Props> = ({
    amount = 0,
    amountCrypto = 0,
    autoRounding = true,
    rounding = 2,
    kilo = false,
    currency = 'USD',
    type = 'fiat',
    format = 'code',
    position = 'append',
    superscript = false,
    zeroAmount = ZERO_AMOUNT,
    locale,
    className,
    testIds,
}: Props): JSX.Element => {
    const CurrencyTag = superscript ? 'sup' : 'span'
    const [state, setState] = useState<State>({
        amount: '',
        currency: '',
    })

    useEffect(() => {
        const amountLocale = isNil(locale) ? navigator.language : locale
        let formattedAmount = '',
            formattedCurrency = ''

        if (type === 'crypto') {
            formattedAmount = formatAmountCrypto(amountCrypto, zeroAmount, amountLocale)
        } else {
            formattedAmount = formatAmount(
                amount,
                autoRounding,
                rounding,
                kilo,
                zeroAmount,
                amountLocale
            )
        }
        if (amount !== 0 || amountCrypto !== 0) {
            formattedCurrency = formatCurrency(currency, format)
        }

        if (formattedAmount !== state.amount || formattedCurrency !== state.currency) {
            setState({
                amount: formattedAmount,
                currency: formattedCurrency,
            })
        }
    }, [amount, amountCrypto, currency])

    return (
        <span
            className={classNames(styles.Amount, className)}
            data-testid={testIds?.root ?? 'currency-amount'}
        >
            {position === 'prepend' && (
                <CurrencyTag
                    className={styles.AmountCurrency}
                    data-testid={testIds?.currency ?? 'currency'}
                >
                    {state.currency}
                </CurrencyTag>
            )}
            <span
                className={styles.AmountNumber}
                data-testid={testIds?.amount ?? 'number'}
            >
                {state.amount}
            </span>
            {position === 'append' && (
                <CurrencyTag
                    className={styles.AmountCurrency}
                    data-testid={testIds?.currency ?? 'currency'}
                >
                    {state.currency}
                </CurrencyTag>
            )}
        </span>
    )
}

Amount.displayName = 'Amount'

export default Amount
