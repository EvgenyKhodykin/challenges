import classNames from 'classnames'
import { LANGUAGES } from 'lib/forms/forms.const'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import type { FunctionComponent } from 'react'
import { Fragment } from 'react'

import type MenuItem from '../../lib/navigation/menu-item.interface'
import SelectLanguage from '../inputs/select.language'
import styles from './menu.drawer.module.scss'

export interface Props {
    items: Array<MenuItem>
}

const Menu: FunctionComponent<Props> = ({ items }: Props): JSX.Element => {
    const { t } = useTranslation('common')

    if (isEmpty(items)) {
        return <Fragment />
    }

    return (
        <>
            <ul className={styles.Navigation} data-testid='menu-profile'>
                {map(
                    items,
                    ({ id, href, active }: MenuItem, index: number): JSX.Element => (
                        <li className={styles.Item} key={index}>
                            <Link
                                href={href}
                                title={t(`menu.profile.${id}`)}
                                className={classNames(styles.Link, {
                                    [styles.Active]: active,
                                })}
                            >
                                {t(`menu.profile.${id}`)}
                            </Link>
                        </li>
                    )
                )}
            </ul>
            <SelectLanguage items={LANGUAGES} />
        </>
    )
}

const defaultProps: Props = {
    items: [],
}

Menu.displayName = 'Navigation:Menu.drawer'

Menu.defaultProps = defaultProps

export default Menu
