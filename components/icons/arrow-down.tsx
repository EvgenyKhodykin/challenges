import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import componentStyles from './arrow-down.module.scss'
import type IconProps from './icon-props.interface'

const ArrowDown: React.FC<SvgIconProps & IconProps> = ({
    className,
    ...props
}: SvgIconProps & IconProps): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 27 30'}
        className={classNames(componentStyles.Root, className)}
    >
        <path d='M7.91914 12.1232C8.36097 11.6814 9.07731 11.6814 9.51914 12.1232L13.5191 16.1232L17.5191 12.1232C17.961 11.6814 18.6773 11.6814 19.1191 12.1232C19.561 12.5651 19.561 13.2814 19.1191 13.7232L13.5191 19.3232L7.91914 13.7232C7.47731 13.2814 7.47731 12.5651 7.91914 12.1232Z' />
    </SvgIcon>
)

ArrowDown.displayName = 'Icon:ArrowDown'

export default ArrowDown
