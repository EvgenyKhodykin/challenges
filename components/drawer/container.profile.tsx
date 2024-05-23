import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import partial from 'lodash/partial'
import type { FunctionComponent } from 'react'
import React, { Fragment, useEffect, useRef } from 'react'

import styles from './container.profile.module.scss'
import type ContainerProps from './container-props.interface'

export type Props = Omit<ContainerProps, 'variant'>

const Container: FunctionComponent<Props> = ({
    isShown,
    handleClose,
    children,
    className,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const width: React.MutableRefObject<number> = useRef<number>(isDesktop ? 380 : 310)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(partial(handleResize, width, isDesktop), [isDesktop])
    return (
        <AnimatePresence>
            {isShown && (
                <Fragment>
                    <motion.div
                        key={'background'}
                        data-testid='drawer-container-profile-background'
                        className={styles.Background}
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'linear' }}
                        exit={{
                            opacity: 0,
                            transition: { delay: 0.1, duration: 0.3, ease: 'linear' },
                        }}
                    />
                    <motion.div
                        key={'content'}
                        data-testid='drawer-container-profile-content'
                        className={classNames(styles.Content, className)}
                        initial={{ translateX: width.current }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 0.3, ease: 'linear', delay: 0.1 }}
                        exit={{
                            translateX: width.current,
                            transition: { delay: 0, duration: 0.3, ease: 'linear' },
                        }}
                    >
                        {children}
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>
    )
}

Container.displayName = 'Drawer:Container.profile'

export default Container

export const handleResize = (
    ref: React.MutableRefObject<number>,
    isDesktop: boolean
): void => {
    ref.current = 310
    if (isDesktop) {
        ref.current = 380
    }
}
