import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type IconProps from './icon-props.interface'
import styles from './open.module.scss'

export type Props = Pick<IconProps, 'className'>

const Open: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 24 24'}
        className={classNames(styles.Root, className)}
    >
        <path d='M17.08,24H3.23c-.86,0-1.67-.34-2.28-.95s-.95-1.42-.95-2.28V6.92c0-.86,.34-1.67,.95-2.28s1.42-.95,2.28-.95H12.89c.51,0,.92,.41,.92,.92s-.41,.92-.92,.92H3.23c-.37,0-.72,.14-.98,.41s-.41,.61-.41,.98v13.85c0,.37,.14,.72,.41,.98s.61,.41,.98,.41h13.85c.18,0,.36-.04,.53-.11s.32-.17,.45-.3,.23-.28,.3-.45c.07-.17,.11-.35,.11-.53V10.15c0-.51,.41-.92,.92-.92s.92,.41,.92,.92v10.62c0,.43-.08,.84-.25,1.24-.16,.39-.4,.74-.7,1.05s-.65,.54-1.05,.7c-.39,.16-.81,.25-1.24,.25Z' />
        <path d='M10.15,14.77c-.24,0-.47-.09-.65-.27-.36-.36-.36-.94,0-1.31L20.85,1.85h-4.23c-.51,0-.92-.41-.92-.92s.41-.92,.92-.92h6.46c.51,0,.92,.41,.92,.92V7.38c0,.51-.41,.92-.92,.92s-.92-.41-.92-.92V3.15L10.81,14.5c-.18,.18-.42,.27-.65,.27Z' />
    </SvgIcon>
)

Open.displayName = 'Icon:Open'

export default Open
