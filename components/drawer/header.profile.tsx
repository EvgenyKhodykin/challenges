import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import type { FunctionComponent } from 'react'

import CloseButton from '../buttons/close'
import styles from './header.profile.module.scss'
import type HeaderProps from './header-props.interface'

export type Props = Omit<HeaderProps, 'variant'>

const Header: FunctionComponent<Props> = ({
    className,
    name,
    email,
    handleClose,
}: Props): JSX.Element => (
    <div
        data-testid='drawer-header-profile-wrapper'
        className={classNames(styles.Header, className)}
    >
        <CloseButton className={styles.CloseButton} onPress={handleClose} />
        <div data-testid='drawer-header-profile-content' className={styles.Content}>
            <span data-testid='drawer-header-profile-name' className={styles.Name}>
                {name}
            </span>
            <span data-testid='drawer-header-profile-email' className={styles.Email}>
                {email}
            </span>
        </div>
        {isString(name) && !isEmpty(name) && (
            <div data-testid='drawer-header-profile-avatar' className={styles.Avatar}>
                {name.substring(0, 1)}
            </div>
        )}
    </div>
)

Header.displayName = 'Drawer:Header.profile'

export default Header
