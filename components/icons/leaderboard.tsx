import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type IconProps from './icon-props.interface'
import styles from './leaderboard.module.scss'

export type Props = Pick<IconProps, 'className'>

const Leaderboard: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 24 24'}
        className={classNames(styles.Root, className)}
    >
        <path d='M6.75 20.25H2.75V9.75H6.75V20.25ZM10 20.25V3.75H14V20.25H10ZM17.25 20.25V11.75H21.25V20.25H17.25Z' />
    </SvgIcon>
)

Leaderboard.displayName = 'Icon:Leaderboard'

export default Leaderboard
