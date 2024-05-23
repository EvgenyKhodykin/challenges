import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type IconProps from './icon-props.interface'
import styles from './no-change.module.scss'

export type Props = Pick<IconProps, 'className'>

const NoChange: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 10 10'}
        className={classNames(styles.Root, className)}
    >
        <circle cx='5' cy='5' r='4' />
    </SvgIcon>
)

NoChange.displayName = 'Icon:NoChange'

export default NoChange
