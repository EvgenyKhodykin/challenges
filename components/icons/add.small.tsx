import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './add.small.module.scss'
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
        <circle cx='12' cy='12' r='9' />
        <path d='M12 8.45557V15.5442' />
        <path d='M15.543 12L8.45436 12' />
    </SvgIcon>
)

Component.displayName = 'Icons:Add.small'

export default Component
