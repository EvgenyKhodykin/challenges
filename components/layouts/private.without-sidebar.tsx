import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import partial from 'lodash/partial'
import Image from 'next/image'
import type { FunctionComponent } from 'react'
import { useContext, useEffect, useRef } from 'react'

import type Client from '../../lib/client/client.interface'
import ClientContext from '../../lib/client/context'
import Burger from '../buttons/burger.lines'
import styles from './private.without-sidebar.module.scss'
import PrivateProps from './private-props.interface'

export type Props = Omit<PrivateProps, 'variant' | 'filters'>

const Private: FunctionComponent<Props> = ({
    header,
    footer,
    menu,
    children,
}: Props): JSX.Element => {
    const [mobileNavigation, toggleMobileNavigation] = useCycle(false, true)
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const isSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const contextValue = useContext(ClientContext)
    const client = contextValue as Client

    useEffect(() => {
        const handler = partial(handleResize, mobileNavigation, toggleMobileNavigation)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobileNavigation])

    const mobileWidth = useRef<number>(285)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(partial(updateWidth, mobileWidth, isSmall), [isDesktop, isSmall])

    return (
        <div className={styles.Wrapper}>
            {isDesktop && (
                <div className={styles.Container}>
                    <header className={styles.Header}>
                        <Image
                            src={client.logo.src}
                            width={client.logo.width}
                            height={client.logo.height}
                            alt={client.name}
                            className={styles.CompanyLogo}
                            priority={true}
                        />
                        <nav className={styles.Menu}>{menu}</nav>
                        <div className={styles.HeaderContent}>{header}</div>
                    </header>
                    <div className={styles.Content} id={'scrollable-content-desktop'}>
                        {children}
                        <footer className={styles.Footer}>{footer}</footer>
                    </div>
                </div>
            )}
            {!isDesktop && (
                <AnimatePresence>
                    {mobileNavigation && (
                        <motion.div
                            key={'navigation'}
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: mobileWidth.current,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: 'linear',
                            }}
                            exit={{
                                width: 0,
                                transition: { delay: 0.6, duration: 0.3 },
                            }}
                            className={styles.Menu}
                        >
                            {menu}
                        </motion.div>
                    )}
                    <div key={'content'} className={styles.Content}>
                        <header
                            id='main-header'
                            className={styles.Header}
                            data-testid='main-header'
                        >
                            <Burger
                                className={styles.Burger}
                                onClick={() => toggleMobileNavigation()}
                            />
                            <Image
                                src={client.logo.src}
                                width={client.logo.width}
                                height={client.logo.height}
                                alt={client.name}
                                className={styles.CompanyLogo}
                                priority={true}
                            />
                            <div className={styles.HeaderContent}>{header}</div>
                        </header>
                        <div id='scrollable-content-mobile'>{children}</div>
                        <footer id='main-footer' className={styles.Footer}>
                            {footer}
                        </footer>
                    </div>
                </AnimatePresence>
            )}
        </div>
    )
}

Private.displayName = 'Layout:Private.without-sidebar'

export default Private

// @todo move this under lib shared directory
export const handleResize = (
    mobileNavigation: boolean,
    toggleMobileNavigation: (i?: number) => void
) => {
    if (mobileNavigation) {
        toggleMobileNavigation()
    }
}

// @todo move this under lib shared directory
export const updateWidth = (ref: React.MutableRefObject<number>, isSmall: boolean) => {
    ref.current = 285
    if (isSmall) {
        ref.current = 325
    }
}
