import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './arrow-right.module.scss'
import type Props from './icon-props.interface'

const ArrowRight: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 29 21'}
    >
        <path d='M24.7385 11.0895H0.000183105V9.31453H24.7385L16.7056 1.28538L17.9615 0L28.1636 10.202L17.9615 20.4041L16.7056 19.1187L24.7385 11.0895Z' />
    </SvgIcon>
)

ArrowRight.displayName = 'Icon:ArrowRight'

export default ArrowRight
