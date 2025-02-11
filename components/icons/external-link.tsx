import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './external-link.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const ExternalLink: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 20 20'}
        className={classNames(styles.Root, className)}
    >
        <path d='M16 8.5V17.125C16 17.3712 15.9515 17.615 15.8573 17.8425C15.763 18.07 15.6249 18.2767 15.4508 18.4508C15.2767 18.6249 15.07 18.763 14.8425 18.8573C14.615 18.9515 14.3712 19 14.125 19H2.875C2.37772 19 1.90081 18.8025 1.54917 18.4508C1.19754 18.0992 1 17.6223 1 17.125V5.875C1 5.37772 1.19754 4.90081 1.54917 4.54917C1.90081 4.19754 2.37772 4 2.875 4H10.7256M13.75 1H19V6.25M8.5 11.5L18.625 1.375' />
    </SvgIcon>
)

ExternalLink.displayName = 'Icon:ExternalLink'

export default ExternalLink
