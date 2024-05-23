import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { DASHBOARD_LIST_VARIANTS } from 'lib/client/client.const'
import { useRouter } from 'next/router'

import type { TestIds as BodyTestIds } from './body.credentials'
import Body from './body.credentials'
import type { TestIds as FooterTestIds } from './footer.credentials'
import Footer from './footer.credentials'
import type { TestIds as HeaderTestIds } from './header.credentials'
import Header from './header.credentials'
import styles from './modal.credentials.module.scss'

export interface TestIds {
    root?: string
    body?: BodyTestIds
    footer?: FooterTestIds
    header?: HeaderTestIds
}

export interface Props {
    visible: boolean
    handleClose: React.MouseEventHandler
    id: string
    server: string
    exchangePlatform: string
    className?: string
    testIds?: TestIds
    variant?: DASHBOARD_LIST_VARIANTS
}

const Modal: React.FC<Props> = ({
    visible,
    handleClose,
    id,
    server,
    exchangePlatform,
    className,
    testIds,
    variant = DASHBOARD_LIST_VARIANTS.TILE,
}: Props): JSX.Element => {
    const router = useRouter()

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key={'credentials'}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeIn',
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.3,
                            ease: 'easeIn',
                        },
                    }}
                    className={classNames(styles.Root, className)}
                    data-testid={testIds?.root ?? 'modals-credentials-root'}
                >
                    <Header
                        className={styles.Header}
                        handleClose={handleClose}
                        testIds={testIds?.header}
                    />
                    <Body
                        className={classNames(styles.Body, {
                            [styles.BodyList]: variant === DASHBOARD_LIST_VARIANTS.LIST,
                        })}
                        id={id}
                        server={server}
                        exchangePlatform={exchangePlatform}
                        testIds={testIds?.body}
                        variant={variant}
                    />
                    {variant === DASHBOARD_LIST_VARIANTS.TILE && (
                        <Footer
                            className={styles.Footer}
                            handleResetPassword={() => router.push('/forgot')}
                            testIds={testIds?.footer}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

Modal.displayName = 'Modals:Credentials'

export default Modal
