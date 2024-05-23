import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type Props from './icon-props.interface'
import styles from './restart.module.scss'

const Component: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 24 24'}
    >
        <path d='M19.5,13.5c0,1.48-.44,2.93-1.26,4.17-.82,1.23-2,2.19-3.37,2.76s-2.88,.72-4.33,.43c-1.45-.29-2.79-1-3.84-2.05s-1.76-2.39-2.05-3.84c-.29-1.45-.14-2.96,.43-4.33,.57-1.37,1.53-2.54,2.76-3.37s2.68-1.26,4.17-1.26h4.64l-2.69,2.69,1.05,1.06,4.5-4.5L15,.75l-1.05,1.06,2.69,2.69h-4.64c-1.78,0-3.52,.53-5,1.52-1.48,.99-2.63,2.39-3.31,4.04-.68,1.64-.86,3.45-.51,5.2,.35,1.75,1.2,3.35,2.46,4.61s2.86,2.12,4.61,2.46c1.75,.35,3.56,.17,5.2-.51s3.05-1.83,4.04-3.31,1.52-3.22,1.52-5h-1.51Z' />
    </SvgIcon>
)

Component.displayName = 'Icons:Restart'

export default Component
