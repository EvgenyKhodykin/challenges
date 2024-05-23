import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import type { FunctionComponent } from 'react'
import { Fragment } from 'react'

import type MenuItem from '../../lib/navigation/menu-item.interface'
import styles from './menu.footer.module.scss'

export interface Props {
    items: Array<MenuItem>
}

const Menu: FunctionComponent<Props> = ({ items }: Props): JSX.Element => {
    const { t } = useTranslation('common')
    if (!isShown(items)) {
        return <Fragment />
    }
    return (
        <ul className={styles.Navigation}>
            {map(
                items,
                ({ id, href, active }: MenuItem, index: number): JSX.Element => (
                    <li className={styles.Item} key={index}>
                        <Link
                            href={href}
                            title={t(`menu.footer.${id}`)}
                            className={classNames(styles.Link, {
                                [styles.Active]: active,
                            })}
                        >
                            {t(`menu.footer.${id}`)}
                        </Link>
                    </li>
                )
            )}
        </ul>
    )
}

const defaultProps: Props = {
    items: [],
}

Menu.displayName = 'Navigation:Menu.footer'

Menu.defaultProps = defaultProps

export default Menu

export const isShown = (items: Array<MenuItem>): boolean => !isEmpty(items)
