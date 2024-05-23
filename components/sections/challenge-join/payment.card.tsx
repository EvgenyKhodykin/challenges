import { motion } from 'framer-motion'

import styles from './payment.card.module.scss'

const Component: React.FC = (): JSX.Element => (
    <motion.div key={'payment-card'} className={styles.Root}>
        <br />
        <br />
    </motion.div>
)

Component.displayName = 'Sections:ChallengeJoin:Payment.card'

export default Component
