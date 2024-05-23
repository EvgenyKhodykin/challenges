import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './checked-list.module.scss'
import type Props from './icon-props.interface'

const CheckedList: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 24 24'}
    >
        <path d='M12 6H22.5V7.5H12V6ZM4.5 7.9425L2.5575 6L1.5 7.0575L4.5 10.0575L10.5 4.0575L9.4425 3L4.5 7.9425ZM12 16.5H22.5V18H12V16.5ZM4.5 18.4425L2.5575 16.5L1.5 17.5575L4.5 20.5575L10.5 14.5575L9.4425 13.5L4.5 18.4425Z' />
    </SvgIcon>
)

CheckedList.displayName = 'Icon:CheckedList'

export default CheckedList
