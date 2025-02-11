import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type IconProps from './icon-props.interface'
import styles from './instagram.module.scss'

export type Props = Pick<IconProps, 'className'>

const Instagram: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 24 24'}
        className={classNames(styles.Root, className)}
    >
        <path d='M23.91,7.11c-.05-1.25-.26-2.13-.57-2.91-.31-.8-.71-1.47-1.37-2.13s-1.33-1.07-2.13-1.37c-.78-.31-1.66-.52-2.91-.57-1.28-.05-1.68-.07-4.95-.07s-3.67,.02-4.95,.07c-1.25,.05-2.13,.26-2.91,.57-.8,.31-1.47,.71-2.13,1.37-.66,.66-1.06,1.33-1.37,2.13C.31,4.98,.09,5.86,.05,7.11,0,8.39-.02,8.79-.02,12.06S0,15.73,.05,17.01c.05,1.25,.26,2.13,.57,2.91,.31,.8,.71,1.47,1.37,2.13,.66,.66,1.33,1.07,2.13,1.37,.78,.31,1.66,.52,2.91,.57,1.28,.05,1.68,.07,4.95,.07s3.67-.02,4.95-.07c1.25-.05,2.13-.26,2.91-.57,.8-.31,1.47-.71,2.13-1.37,.66-.66,1.07-1.33,1.37-2.13,.31-.78,.52-1.66,.57-2.91,.05-1.28,.07-1.68,.07-4.95s-.02-3.67-.07-4.95Zm-1.56,10.08c-.05,1.23-.28,1.92-.45,2.37-.47,1.16-1.25,1.94-2.41,2.41-.45,.17-1.14,.4-2.37,.45-1.33,.05-1.73,.07-5.14,.07s-3.81-.02-5.14-.07c-1.23-.05-1.92-.28-2.37-.45-1.16-.47-1.94-1.25-2.41-2.41-.17-.45-.4-1.14-.45-2.37-.05-1.33-.07-1.73-.07-5.14s.02-3.81,.07-5.14c.05-1.23,.28-1.92,.45-2.37,.47-1.16,1.25-1.94,2.41-2.41,.45-.17,1.14-.4,2.37-.45,1.33-.05,1.73-.07,5.14-.07s3.81,.02,5.14,.07c1.23,.05,1.92,.28,2.37,.45,1.16,.47,1.94,1.25,2.41,2.41,.17,.45,.4,1.14,.45,2.37,.05,1.33,.07,1.73,.07,5.14s-.02,3.81-.07,5.14Z' />
        <path d='M11.98,5.91c-3.41,0-6.15,2.75-6.15,6.15s2.75,6.15,6.15,6.15,6.15-2.75,6.15-6.15-2.75-6.15-6.15-6.15Zm0,10.96c-2.65,0-4.8-2.15-4.8-4.8s2.15-4.8,4.8-4.8,4.8,2.15,4.8,4.8-2.15,4.8-4.8,4.8Z' />
        <path d='M18.37,4.2c-.8,0-1.42,.66-1.42,1.47s.62,1.42,1.42,1.42,1.47-.62,1.47-1.42-.66-1.47-1.47-1.47Z' />
    </SvgIcon>
)

Instagram.displayName = 'Icon:Instagram'

export default Instagram
