import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './chart.candle.module.scss'
import type Props from './icon-props.interface'

const Component: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 25 25'}
    >
        <path d='M20.1787 8.16211H18.6787V5.16211H17.1787V8.16211H15.6787V17.1621H17.1787V20.1621H18.6787V17.1621H20.1787V8.16211ZM18.6787 15.6621H17.1787V9.66211H18.6787V15.6621ZM11.1787 6.66211H9.67871V3.66211H8.17871V6.66211H6.67871V14.1621H8.17871V17.1621H9.67871V14.1621H11.1787V6.66211ZM9.67871 12.6621H8.17871V8.16211H9.67871V12.6621Z' />
        <path d='M23.1787 23.1621H3.67871C3.28089 23.1621 2.89936 23.0041 2.61805 22.7228C2.33675 22.4415 2.17871 22.0599 2.17871 21.6621V2.16211H3.67871V21.6621H23.1787V23.1621Z' />
    </SvgIcon>
)

Component.displayName = 'Icon:Chart.candle'

export default Component
