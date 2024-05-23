import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './arrow-left.module.scss'
import type Props from './icon-props.interface'

const ArrowLeft: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 34 24'}
    >
        <path d='M4.18431 13.0842H34.4067V10.9158H4.18431L13.2305 1.8738C13.6558 1.44872 13.6598 0.760589 13.2396 0.33051C12.8125 -0.106604 12.1106 -0.110671 11.6785 0.321463L-2.67029e-05 12L11.6785 23.6785C12.1106 24.1107 12.8125 24.1066 13.2396 23.6695C13.6598 23.2394 13.6558 22.5513 13.2305 22.1262L4.18431 13.0842Z' />
    </SvgIcon>
)

ArrowLeft.displayName = 'Icon:ArrowLeft'

export default ArrowLeft
