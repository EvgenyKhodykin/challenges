import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './calendar.arrow-down.module.scss'
import type Props from './icon-props.interface'

const Component: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 24 24'}
    >
        <path d='M17 4H19C20.103 4 21 4.897 21 6V10H19.0003L19 8H5V20H9V22H5C3.897 22 3 21.103 3 20V6C3 4.897 3.897 4 5 4H7V2H9V4H15V2H17V4Z' />
        <path d='M16.0003 21.6663V12.333M11.917 17.583L16.0003 21.6663L20.0837 17.583' />
    </SvgIcon>
)

Component.displayName = 'Icon:Calendar.arrow-down'

export default Component
