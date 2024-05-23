import classNames from 'classnames'
import { motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'

import Button from '../../buttons/primary.general'
import IconPayPal from '../../icons/paypal'
import styles from './payment.paypal.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => {
    const { t } = useTranslation('challenge-join')

    return (
        <motion.div key={'payment-paypal'} className={classNames(styles.Root, className)}>
            <p className={styles.Text}>{t('rightBoard.paymentOptions.payPal.message')}</p>
            <Button>
                {t('rightBoard.paymentOptions.payPal.buttonLabel')}
                <IconPayPal className={styles.Icon} />
            </Button>
        </motion.div>
    )
}

Component.displayName = 'Sections:ChallengeJoin:Payment.paypal'

export default Component
