import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type Props from './icon-props.interface'
import styles from './reload.module.scss'

const Add: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 24 24'}
    >
        <path d='M1 12C1.00004 9.80871 1.68298 7.6719 2.95383 5.88677C4.22469 4.10164 6.02027 2.75694 8.09086 2.03969C10.1614 1.32244 12.4041 1.2683 14.5069 1.8848C16.6096 2.50131 18.468 3.75781 19.8235 5.47953M22.0824 12C22.0823 14.1913 21.3994 16.3281 20.1285 18.1132C18.8577 19.8984 17.0621 21.2431 14.9915 21.9603C12.9209 22.6776 10.6783 22.7317 8.57549 22.1152C6.47272 21.4987 4.61433 20.2422 3.25882 18.5205M7.77647 18.0235H2.50588V23.2941M20.5765 0.705887V5.97648H15.3059' />
    </SvgIcon>
)

Add.displayName = 'Icon:Add'

export default Add
