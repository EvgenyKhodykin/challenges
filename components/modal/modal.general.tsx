import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useEffect, useRef } from 'react'

import type { TestIds as CloseTestIds } from '../buttons/close'
import CloseButton from '../buttons/close'
import styles from './modal.general.module.scss'

export interface TestIds {
    content?: string
    close?: CloseTestIds
}

export interface Props {
    handleClose?: () => void
    shown?: boolean
    className?: string
    children?: React.ReactNode
    testIds?: TestIds
}

const Modal: React.FC<Props> = ({
    shown = false,
    className,
    children,
    handleClose = () => undefined,
    testIds,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const height = useRef<number>(0)

    useEffect(() => {
        const handler = () => {
            const newHeightValue = window.innerHeight
            if (newHeightValue !== height.current) {
                height.current = newHeightValue
            }

            if (shown) {
                handleClose()
            }
        }

        if (!height.current) {
            height.current = window.innerHeight
        }

        window.addEventListener('resize', handler)

        return () => window.removeEventListener('resize', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDesktop, shown])

    return (
        <>
            {isDesktop && (
                <AnimatePresence>
                    {shown && (
                        <Fragment>
                            <motion.div
                                key={'background'}
                                className={styles.Background}
                                onClick={handleClose}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'linear' }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        delay: 0.2,
                                        duration: 0.3,
                                        ease: 'linear',
                                    },
                                }}
                            />
                            <motion.div
                                key={'content'}
                                className={classNames(styles.Content, className)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, ease: 'linear', delay: 0.2 }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    transition: { duration: 0.3, ease: 'linear' },
                                }}
                                data-testid={testIds?.content ?? 'modal-content'}
                            >
                                {children}
                                <CloseButton
                                    onPress={handleClose}
                                    className={styles.Close}
                                    testIds={testIds?.close}
                                />
                            </motion.div>
                        </Fragment>
                    )}
                </AnimatePresence>
            )}
            {!isDesktop && (
                <AnimatePresence>
                    {shown && (
                        <Fragment>
                            <motion.div
                                key={'background'}
                                className={styles.Background}
                                onClick={handleClose}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'linear' }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        delay: 0.2,
                                        duration: 0.3,
                                        ease: 'linear',
                                    },
                                }}
                            />
                            <motion.div
                                key={'content'}
                                className={classNames(styles.Content, className)}
                                initial={{ y: height.current }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.3, ease: 'linear', delay: 0.2 }}
                                exit={{
                                    y: height.current,
                                    transition: { duration: 0.3, ease: 'linear' },
                                }}
                                data-testid={testIds?.content ?? 'modal-content'}
                            >
                                {children}
                                <CloseButton
                                    onPress={handleClose}
                                    className={styles.Close}
                                    testIds={testIds?.close}
                                />
                            </motion.div>
                        </Fragment>
                    )}
                </AnimatePresence>
            )}
        </>
    )
}

export default Modal
