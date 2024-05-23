import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type Props from './icon-props.interface'
import styles from './save-line.module.scss'

const SaveLine: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox='0 0 24 25'
        className={classNames(styles.Root, className)}
    >
        <path d='M7.5 3.64648H3V21.6465H21V8.14648L16.5 3.64648H14.25H7.5ZM7.5 3.64648V8.14648H14.25V3.64648H7.5ZM7.5 3.64648H14.25H7.5ZM12 12.6465C11.2496 12.6465 9.75 13.0965 9.75 14.8965C9.75 16.6965 11.2496 17.1465 12 17.1465C12.7504 17.1465 14.25 16.6965 14.25 14.8965C14.25 13.0965 12.7504 12.6465 12 12.6465Z' />
    </SvgIcon>
)

SaveLine.displayName = 'Icon:SaveLine'

export default SaveLine
