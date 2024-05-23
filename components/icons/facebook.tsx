import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './facebook.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const Facebook: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 25 25'}
        className={classNames(styles.Root, className)}
    >
        <path d='M12.5 0C5.60833 0 0 5.60833 0 12.5C0 19.3917 5.60833 25 12.5 25C19.3917 25 25 19.3917 25 12.5C25 5.60833 19.3917 0 12.5 0ZM12.5 2.08333C18.2656 2.08333 22.9167 6.73438 22.9167 12.5C22.9192 14.9937 22.025 17.4052 20.3972 19.2944C18.7695 21.1836 16.5167 22.4245 14.05 22.7906V15.5375H17.0167L17.4823 12.524H14.05V10.8781C14.05 9.62812 14.4615 8.51667 15.6313 8.51667H17.5115V5.8875C17.1812 5.84271 16.4823 5.74583 15.1615 5.74583C12.4031 5.74583 10.7865 7.20208 10.7865 10.5208V12.524H7.95104V15.5375H10.7865V22.7646C8.35391 22.3642 6.14295 21.112 4.54864 19.2316C2.95432 17.3512 2.08051 14.9653 2.08333 12.5C2.08333 6.73438 6.73438 2.08333 12.5 2.08333Z' />
    </SvgIcon>
)

Facebook.displayName = 'Icon:Facebook'

export default Facebook
