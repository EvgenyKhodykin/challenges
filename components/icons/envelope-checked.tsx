import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './envelope-checked.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const Email: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 49 48'}
        className={classNames(styles.Root, className)}
    >
        <path
            d='M40.5 8H8.5C6.3 8 4.52 9.8 4.52 12L4.5 36C4.5 38.2 6.3 40 8.5 40H24.5V36H8.5V16L24.5 26L40.5 16V26H44.5V12C44.5 9.8 42.7 8 40.5 8ZM24.5 22L8.5 12H40.5L24.5 22ZM35.18 44L28.1 36.92L30.92 34.1L35.16 38.34L43.64 29.86L46.5 32.68L35.18 44Z'
            fill='var(--success-color-main)'
        />
        <path d='M40.5 8H8.5C6.3 8 4.52 9.8 4.52 12L4.5 36C4.5 38.2 6.3 40 8.5 40H24.5V36H8.5V16L24.5 26L40.5 16V26H44.5V12C44.5 9.8 42.7 8 40.5 8ZM24.5 22L8.5 12H40.5L24.5 22Z' />
    </SvgIcon>
)

Email.displayName = 'Icon:Email'

export default Email
