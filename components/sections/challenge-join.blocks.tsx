/* eslint-disable react-hooks/exhaustive-deps */
import find from 'lodash/find'
import { useState } from 'react'

import type Product from '../../lib/products/product.interface'
import PaymentForm from '../forms/challenge-join'
import Paper from '../surfaces/paper'
import styles from './challenge-join.blocks.module.scss'
import Plan from './challenge-join.plan'

export interface Props {
    onChange: () => void
}

const Component: React.FC<Props> = (): JSX.Element => {
    const products: Array<Product> = [
        {
            id: '1234',
            account: {
                amount: 25000,
                currency: 'USD',
            },
        },
        {
            id: '5678',
            account: {
                amount: 50000,
                currency: 'USD',
            },
        },
        {
            id: '91011',
            account: {
                amount: 100000,
                currency: 'USD',
            },
        },
    ]
    const [productID, setProductID] = useState<string>(products[0].id)

    return (
        <div className={styles.Root}>
            <Paper className={styles.Plan}>
                <Plan onChange={setProductID} data={products} />
            </Paper>
            <Paper className={styles.Payment}>
                <PaymentForm data={find(products, { id: productID }) ?? products[0]} />
            </Paper>
        </div>
    )
}

Component.displayName = 'Sections:ChallengeJoin.blocks'

export default Component
