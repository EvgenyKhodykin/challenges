import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import type { FunctionComponent } from 'react'

import styles from './drawer.profile.module.scss'
import type DrawerProps from './drawer-props.interface'

export type Props = Omit<DrawerProps, 'variant'>

const Drawer: FunctionComponent<Props> = ({
    className,
    onClick,
    userName,
}: Props): JSX.Element => (
    <IconButton
        data-testid='button-drawer-profile'
        className={classNames(styles.Button, className)}
        onClick={onClick}
    >
        {isString(userName) && !isEmpty(userName) && userName.substring(0, 1)}
    </IconButton>
)

Drawer.displayName = 'Button:Drawer.profile'

export default Drawer
