import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import partial from 'lodash/partial'
import Image from 'next/image'
import type { FunctionComponent } from 'react'
import { Fragment, useContext, useEffect, useMemo, useRef } from 'react'

import type Client from '../../lib/client/client.interface'
import ClientContext from '../../lib/client/context'
import { LAYOUT_PRIVATE_WITH_SIDEBAR_FILTERS_TOGGLE_TIME } from '../../lib/utils/utils.const'
import Burger from '../buttons/burger.lines'
import styles from './private.with-sidebar.module.scss'
import PrivateProps from './private-props.interface'

export type Props = Omit<PrivateProps, 'variant'>

const Private: FunctionComponent<Props> = ({
    header,
    footer,
    filters,
    menu,
    children,
    onFilterToggle = () => undefined,
    isFiltersOpened,
    onScroll = () => undefined,
    className,
}: Props): JSX.Element => {
    const [mobileNavigation, toggleMobileNavigation] = useCycle(false, true)
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const isSmall = useMediaQuery(theme.breakpoints.up('sm'))
    const clientContext = useContext(ClientContext)
    const client = clientContext as Client
    const duration = useMemo(() => LAYOUT_PRIVATE_WITH_SIDEBAR_FILTERS_TOGGLE_TIME, [])

    const handleScroll = (event: React.SyntheticEvent) => {
        const target = event.nativeEvent.target as HTMLDivElement
        onScroll(target.scrollTop)
    }

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
            <AnimatePresence>
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
                        <motion.div
                            initial={false}
                            animate={isFiltersOpened ? 'opened' : 'collapsed'}
                            className={classNames(
                                styles.Filters,
                                isFiltersOpened ? className : ''
                            )}
                            transition={{
                                duration,
                                ease: 'linear',
                            }}
                            variants={{
                                collapsed: {
                                    width: 80,
                                },
                                opened: {
                                    width: 280,
                                },
                            }}
                        >
                            <div className={styles.FiltersContainer}>{filters}</div>
                            <svg
                                className={styles.FiltersTogglerSVG}
                                width='21'
                                height='114'
                                viewBox='0 0 21 114'
                                fill='none'
                            >
                                <path
                                    className={styles.FiltersTogglerSVGShape}
                                    d='M20 91.8421V22.0937C20 16.6987 17.2811 11.667 12.7684 8.71034L1 1V113L12.8192 105.192C17.3027 102.23 20 97.2155 20 91.8421Z'
                                />
                                <path
                                    className={styles.FiltersTogglerSVGBorders}
                                    d='M1 0L1 1L12.7684 8.71034C17.2811 11.667 20 16.6987 20 22.0937L20 57'
                                />
                                <path
                                    className={styles.FiltersTogglerSVGBorders}
                                    d='M1 114L1 112.948L12.7684 105.238C17.2811 102.281 20 97.2495 20 91.8545L20 57'
                                />
                                <motion.path
                                    className={styles.FiltersTogglerSVGArrow}
                                    d='M2 51L8 57L2 63'
                                    initial={false}
                                    animate={isFiltersOpened ? 'opened' : 'collapsed'}
                                    variants={{
                                        collapsed: {
                                            d: [
                                                'M8 51L2 57L8 63',
                                                'M5 51L5 57.7407L5 63',
                                                'M2 51L8 57L2 63',
                                            ],
                                        },
                                        opened: {
                                            d: [
                                                'M2 51L8 57L2 63',
                                                'M5 51L5 57.7407L5 63',
                                                'M8 51L2 57L8 63',
                                            ],
                                        },
                                    }}
                                    transition={{
                                        duration,
                                        times: [0, 0.5, 1],
                                    }}
                                />
                            </svg>
                            <button
                                onClick={onFilterToggle}
                                className={styles.FiltersTogglerButton}
                            />
                        </motion.div>
                        <div className={styles.Content} id={'scrollable-content-desktop'}>
                            {children}
                            <footer className={styles.Footer}>{footer}</footer>
                        </div>
                    </div>
                )}
            </AnimatePresence>
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
                    <div
                        key={'content'}
                        className={styles.Content}
                        id={'scrollable-content-mobile'}
                        onScroll={handleScroll}
                    >
                        <header className={styles.Header} data-testid='main-header'>
                            <Burger onClick={() => toggleMobileNavigation()} />
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
                        <div>{children}</div>
                        <footer className={styles.Footer}>{footer}</footer>
                    </div>
                </AnimatePresence>
            )}
        </div>
    )
}

const defaultProps: Props = {
    header: <Fragment />,
    footer: <Fragment />,
    filters: <Fragment />,
    menu: <Fragment />,
    children: <Fragment />,
}

Private.displayName = 'Layout:Private.with-sidebar'

Private.defaultProps = defaultProps

export default Private

// @todo move this under lib shared directory
export const handleResize = (
    mobileNavigation: boolean,
    toggleMobileNavigation: (i?: number | undefined) => void
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
