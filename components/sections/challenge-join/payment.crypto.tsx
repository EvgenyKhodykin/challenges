import classNames from 'classnames'
import { motion } from 'framer-motion'

import Button from '../../buttons/outlined.general'
import styles from './payment.crypto.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => (
    <motion.div key={'payment-crypto'} className={classNames(styles.Root, className)}>
        <div className={styles.Container}>
            <Button className={classNames(styles.Button, styles.Bitcoin)} />
            <small className={styles.Label}>Bitcoin</small>
        </div>
        <div className={styles.Container}>
            <Button className={classNames(styles.Button, styles.Etherium)} />
            <small className={styles.Label}>Etherium</small>
        </div>
        <div className={styles.Container}>
            <Button className={classNames(styles.Button, styles.Dogecoin)} />
            <small className={styles.Label}>Dogecoin</small>
        </div>
        <div className={styles.Container}>
            <Button className={classNames(styles.Button, styles.Lightcoin)} />
            <small className={styles.Label}>Lightcoin</small>
        </div>
        <div className={styles.Container}>
            <Button className={classNames(styles.Button, styles.Tether)} />
            <small className={styles.Label}>
                Tether
                <br />
                (USDT)
            </small>
        </div>
        <div className={styles.Container}>
            <Button className={classNames(styles.Button, styles.USDCoin)} />
            <small className={styles.Label}>
                USD Coin
                <br />
                (USDC)
            </small>
        </div>
    </motion.div>
)

Component.displayName = 'Sections:ChallengeJoin:Payment.crypto'

export default Component
