import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './chevron-right.module.scss'
import type Props from './icon-props.interface'

const ChevronRight: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 8 14'}
    >
        <path d='M1 1L7 7L0.999999 13' />
    </SvgIcon>
)

ChevronRight.displayName = 'Icon:ChevronRight'

export default ChevronRight
