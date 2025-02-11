import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './email.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const Email: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 26 18'}
        className={classNames(styles.Root, className)}
    >
        <path d='M23.4 0H1.8C1.32261 0 0.864773 0.189642 0.527208 0.527208C0.189642 0.864773 0 1.32261 0 1.8V16.2C0 16.6774 0.189642 17.1352 0.527208 17.4728C0.864773 17.8104 1.32261 18 1.8 18H23.4C23.8774 18 24.3352 17.8104 24.6728 17.4728C25.0104 17.1352 25.2 16.6774 25.2 16.2V1.8C25.2 1.32261 25.0104 0.864773 24.6728 0.527208C24.3352 0.189642 23.8774 0 23.4 0V0ZM21.42 1.8L12.6 7.902L3.78 1.8H21.42ZM1.8 16.2V2.619L12.087 9.738C12.2377 9.84251 12.4166 9.89852 12.6 9.89852C12.7834 9.89852 12.9623 9.84251 13.113 9.738L23.4 2.619V16.2H1.8Z' />
    </SvgIcon>
)

Email.displayName = 'Icon:Email'

export default Email
