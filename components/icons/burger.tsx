import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './burger.module.scss'

export interface Props {
    className?: string
}

const Burger: FunctionComponent<SvgIconProps & Props> = (
    props: SvgIconProps & Props
): JSX.Element => (
    <SvgIcon {...props} className={classNames(styles.Root, props.className)}>
        <path d='M4 6H20M4 12H20M4 18H11' />
    </SvgIcon>
)

Burger.displayName = 'Icon:Burger'

export default Burger
