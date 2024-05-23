import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import type Account from '../../../lib/accounts/account.interface'
import Body from './body.failed'
import styles from './failed.module.scss'
import Header from './header.default'

export interface Props {
    visible: boolean
    onClose: React.MouseEventHandler
    data: Account
    className?: string
}

const Component: React.FC<Props> = ({
    visible,
    className,
    onClose,
    data,
}: Props): JSX.Element => (
    <AnimatePresence>
        {visible && (
            <motion.div
                key={'modal'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeIn' }}
                exit={{
                    opacity: 0,
                    transition: {
                        duration: 0.3,
                        ease: 'easeIn',
                    },
                }}
                className={classNames(styles.Root, className)}
            >
                <Header onClose={onClose} className={styles.Header} />
                <Body className={styles.Body} data={data} />
            </motion.div>
        )}
    </AnimatePresence>
)

Component.displayName = 'Modal:Dashboard:Failed'

export default Component
