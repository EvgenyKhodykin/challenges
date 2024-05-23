import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './change-up.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const ChangeUp: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 10 10'}
        className={classNames(styles.Root, className)}
    >
        <path d='M5 1.5L1 8.5H9L5 1.5Z' />
    </SvgIcon>
)

ChangeUp.displayName = 'Icon:ChangeUp'

export default ChangeUp
