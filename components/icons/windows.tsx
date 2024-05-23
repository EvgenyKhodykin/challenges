import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type IconProps from './icon-props.interface'
import styles from './windows.module.scss'

export type Props = Pick<IconProps, 'className'>

const Windows: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 64 64'}
        className={classNames(styles.Root, className)}
    >
        <path d='M60 33.125H29V55.5L60 60V33.125ZM27 33.125H4V51.875L27 55.2125V33.125ZM60 4L29 8.425V31.125H60V4ZM27 8.7125L4 12V31.125H27V8.7125Z' />
    </SvgIcon>
)

Windows.displayName = 'Icon:Windows'

export default Windows
