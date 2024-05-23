import classNames from 'classnames'
import { motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import type Product from '../../lib/products/product.interface'
import Amount from '../amount/amount'
import AddIcon from '../icons/add.small'
import Select from '../inputs/select'
import Toggle from '../inputs/toggle.general'
import styles from './challenge-join.plan.module.scss'

export interface State {
    currency: string
    riskMode: string
    balance: string
    product: string
}

export interface Props {
    onChange: (value: string) => void
    data: Array<Product>
}

const Component: React.FC<Props> = ({ data, onChange }: Props): JSX.Element => {
    const { t } = useTranslation('challenge-join')
    const [state, setState] = useState<State>({
        currency: 'usd',
        riskMode: 'normal',
        balance: data[0].id,
        product: data[0].id,
    })

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            currency: event.currentTarget.value,
        })
    }

    const handleRiskModeChange = (value: string | Array<string>) => {
        setState({
            ...state,
            riskMode: value as string,
        })
    }

    const handleBalanceChange = (value: string | Array<string>) => {
        setState({
            ...state,
            balance: value as string,
        })

        onChange(value as string)
    }

    const handleProductSelect = (event: React.MouseEvent) => {
        const value = event.currentTarget.getAttribute('data-product')
        if (value) {
            setState({
                ...state,
                balance: value,
                product: value,
            })

            onChange(value)
        }
    }

    return (
        <>
            <div className={styles.Head}>
                <h2 className={styles.Title}>
                    <span className={styles.IconHolder}>
                        <AddIcon className={styles.Icon} />
                    </span>
                    <span className={styles.Text}>{t('leftBoard.title')}</span>
                </h2>
                <p className={styles.Description}>{t('leftBoard.message')}</p>
                <div className={styles.Filters}>
                    <div className={styles.Currency}>
                        <label className={styles.Label}>{t('leftBoard.currency')}</label>
                        <Select
                            id='currency-select'
                            items={[{ value: 'usd', label: 'USD' }]}
                            value={state.currency}
                            onChange={handleCurrencyChange}
                            name={''}
                            className={styles.Select}
                        />
                    </div>
                    <div className={styles.RiskMode}>
                        <label className={styles.Label}>{t('common.riskMode')}</label>
                        <Toggle
                            value={state.riskMode}
                            items={[
                                {
                                    key: 'normal',
                                    element: (
                                        <span> {t('leftBoard.riskFilters.normal')}</span>
                                    ),
                                },
                                {
                                    key: 'aggressive',
                                    element: (
                                        <span>
                                            {t('leftBoard.riskFilters.aggressive')}
                                        </span>
                                    ),
                                },
                            ]}
                            handleToggle={handleRiskModeChange}
                            className={styles.Toggle}
                        />
                    </div>
                    <div className={styles.Balance}>
                        <label className={styles.Label}>{t('common.balance')}</label>
                        <Toggle
                            value={state.balance}
                            items={data.map((item: Product) => ({
                                key: item.id,
                                element: (
                                    <Amount
                                        amount={item.account.amount}
                                        currency={item.account.currency}
                                        className={styles.Amount}
                                        kilo
                                    />
                                ),
                            }))}
                            handleToggle={handleBalanceChange}
                            className={styles.Toggle}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.TableHeader}>
                <div className={styles.Left}>{t('leftBoard.availableLeverage')}</div>
                <div className={styles.Right}>{t('common.challenge')}</div>
            </div>
            <div className={styles.Table}>
                <div className={styles.Column}>
                    <div className={styles.Cell}>
                        {' '}
                        {t('leftBoard.tableCellsHeaders.accountBalance')}
                    </div>
                    <div className={styles.Cell}>
                        {t('leftBoard.tableCellsHeaders.tradingPeriod')}
                    </div>
                    <div className={styles.Cell}>
                        {t('leftBoard.tableCellsHeaders.minTradingDays')}
                    </div>
                    <div className={styles.Cell}>
                        {t('leftBoard.tableCellsHeaders.maxDailyLoss')}
                    </div>
                    <div className={styles.Cell}>
                        {t('leftBoard.tableCellsHeaders.maxLoss')}
                    </div>
                    <div className={styles.Cell}> {t('common.profitTarget')}</div>
                    <div className={styles.Cell}>
                        {' '}
                        {t('leftBoard.tableCellsHeaders.refundableFee')}
                    </div>
                </div>
                {data.map((product: Product, key: number) => (
                    <div
                        className={classNames(styles.Column, {
                            [styles.Active]: product.id === state.balance,
                        })}
                        key={key}
                        onClick={handleProductSelect}
                        data-product={product.id}
                    >
                        {product.id === state.balance ? (
                            <motion.div
                                className={styles.ActiveBackground}
                                layoutId='active-background'
                            />
                        ) : null}
                        <div className={styles.Cell}>
                            <Amount
                                amount={product.account.amount}
                                currency={product.account.currency}
                                format={'symbol'}
                                position={'prepend'}
                                className={styles.Amount}
                                kilo
                            />
                        </div>
                        <div className={styles.Cell}>30</div>
                        <div className={styles.Cell}>-</div>
                        <div className={styles.Cell}>-</div>
                        <div className={styles.Cell}>-</div>
                        <div className={styles.Cell}>-</div>
                        <div className={styles.Cell}>-</div>
                    </div>
                ))}
            </div>
        </>
    )
}

Component.displayName = 'Sections:ChallengeJoin.blocks'

export default Component
