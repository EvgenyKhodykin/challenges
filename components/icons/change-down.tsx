import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './change-down.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const ChangeDown: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 10 10'}
        className={classNames(styles.Root, className)}
    >
        <path d='M5 8.5L1 1.5H9L5 8.5Z' />
    </SvgIcon>
)

ChangeDown.displayName = 'Icon:ChangeDown'

export default ChangeDown
