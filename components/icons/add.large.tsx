import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './add.large.module.scss'
import type Props from './icon-props.interface'

const Component: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 44 44'}
    >
        <circle cx='22' cy='22' r='21.5' />
        <path d='M22.001 14.2026V29.7976' />
        <path d='M29.7988 22.0002L14.2039 22.0002' />
    </SvgIcon>
)

Component.displayName = 'Icons:Add.large'

export default Component
