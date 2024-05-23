import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import type { FunctionComponent } from 'react'

import styles from './earth.module.scss'

const Earth: FunctionComponent<SvgIconProps> = (props: SvgIconProps): JSX.Element => (
    <SvgIcon {...props} className={styles.Root}>
        <path
            d='M12 22.5C17.5229 22.5 22 18.0229 22 12.5C22 6.97715 17.5229 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0229 6.47715 22.5 12 22.5Z'
            stroke='#252733'
            strokeOpacity='0.64'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M2 12.5H22'
            stroke='#252733'
            strokeOpacity='0.64'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M12 22.5C14.2092 22.5 16 18.0229 16 12.5C16 6.97715 14.2092 2.5 12 2.5C9.79085 2.5 8 6.97715 8 12.5C8 18.0229 9.79085 22.5 12 22.5Z'
            stroke='#252733'
            strokeOpacity='0.64'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M4.92871 5.57129C6.73836 7.38094 9.23836 8.50024 11.9998 8.50024C14.7612 8.50024 17.2612 7.38094 19.0709 5.57129'
            stroke='#252733'
            strokeOpacity='0.64'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M19.0709 19.4289C17.2612 17.6193 14.7612 16.5 11.9998 16.5C9.23836 16.5 6.73836 17.6193 4.92871 19.4289'
            stroke='#252733'
            strokeOpacity='0.64'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </SvgIcon>
)

Earth.displayName = 'Icon:Earth'

export default Earth
