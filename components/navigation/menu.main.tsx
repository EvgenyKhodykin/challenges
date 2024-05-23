import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import type { FunctionComponent } from 'react'
import { Fragment } from 'react'

import type MenuItem from '../../lib/navigation/menu-item.interface'
import styles from './menu.main.module.scss'

export interface Props {
    items: Array<MenuItem>
}

const Menu: FunctionComponent<Props> = ({ items }: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const { t } = useTranslation('common')

    if (!isShown(items)) {
        return <Fragment />
    }

    return (
        <Fragment>
            {isDesktop && (
                <ul className={styles.Navigation} data-testid='menu-main-desktop'>
                    {map(
                        items,
                        ({ id, href, active }: MenuItem, index: number): JSX.Element => (
                            <li
                                className={styles.Item}
                                key={index}
                                data-testid='menu-main-item-desktop'
                            >
                                <Link
                                    href={href}
                                    title={t(`menu.main.${id}`)}
                                    className={classNames(styles.Link, {
                                        [styles.Active]: active,
                                    })}
                                >
                                    {t(`menu.main.${id}`)}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            )}
            {!isDesktop && (
                <motion.div
                    variants={{
                        hidden: {
                            transition: {
                                staggerChildren: 0.1,
                                staggerDirection: -1,
                            },
                        },
                        shown: {
                            transition: {
                                staggerChildren: 0.1,
                                staggerDirection: 1,
                            },
                        },
                    }}
                    initial='hidden'
                    animate='shown'
                    exit='hidden'
                    className={styles.Navigation}
                    data-testid='menu-main-mobile'
                >
                    {map(
                        items,
                        ({ id, href, active }: MenuItem, index: number): JSX.Element => (
                            <motion.div
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                    },
                                    shown: {
                                        opacity: 1,
                                    },
                                }}
                                className={styles.Item}
                                key={index}
                                data-testid='menu-main-item-mobile'
                            >
                                <Link
                                    href={href}
                                    title={t(`menu.main.${id}`)}
                                    className={classNames(styles.Link, {
                                        [styles.Active]: active,
                                    })}
                                >
                                    {t(`menu.main.${id}`)}
                                </Link>
                            </motion.div>
                        )
                    )}
                </motion.div>
            )}
        </Fragment>
    )
}

const defaultProps: Props = {
    items: [],
}

Menu.displayName = 'Navigation:Menu.main'

Menu.defaultProps = defaultProps

export default Menu

export const isShown = (items: Array<MenuItem>): boolean => !isEmpty(items)
