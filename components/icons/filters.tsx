import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './filters.module.scss'
import type Props from './icon-props.interface'

const Component: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 37 37'}
    >
        <path d='M23.5 22.5C23.5 23.6046 22.6046 24.5 21.5 24.5C20.3954 24.5 19.5 23.6046 19.5 22.5C19.5 21.3954 20.3954 20.5 21.5 20.5C22.6046 20.5 23.5 21.3954 23.5 22.5ZM24.4585 23C24.2205 24.4189 22.9865 25.5 21.5 25.5C20.0135 25.5 18.7795 24.4189 18.5415 23L11.5 23C11.2239 23 11 22.7761 11 22.5C11 22.2239 11.2239 22 11.5 22L18.5415 22C18.7795 20.5811 20.0135 19.5 21.5 19.5C22.9865 19.5 24.2205 20.5811 24.4585 22L25.5 22C25.7761 22 26 22.2239 26 22.5C26 22.7761 25.7761 23 25.5 23L24.4585 23Z' />
        <path d='M13.5 14.5C13.5 13.3954 14.3954 12.5 15.5 12.5C16.6046 12.5 17.5 13.3954 17.5 14.5C17.5 15.6046 16.6046 16.5 15.5 16.5C14.3954 16.5 13.5 15.6046 13.5 14.5ZM12.5415 14C12.7795 12.5811 14.0135 11.5 15.5 11.5C16.9865 11.5 18.2205 12.5811 18.4585 14H25.5C25.7761 14 26 14.2239 26 14.5C26 14.7761 25.7761 15 25.5 15H18.4585C18.2205 16.4189 16.9865 17.5 15.5 17.5C14.0135 17.5 12.7795 16.4189 12.5415 15L11.5 15C11.2239 15 11 14.7761 11 14.5C11 14.2239 11.2239 14 11.5 14L12.5415 14Z' />
    </SvgIcon>
)

Component.displayName = 'Icons:Filters.rounded'

export default Component
