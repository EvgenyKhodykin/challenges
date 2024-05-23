import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import type { FunctionComponent } from 'react'

import styles from './visibility-off.module.scss'

const VisibilityOff: FunctionComponent<SvgIconProps> = (
    props: SvgIconProps
): JSX.Element => (
    <SvgIcon {...props} className={styles.Root}>
        <path d='M13.876 18.825C13.2579 18.9419 12.6301 19.0005 12.001 19C7.52301 19 3.73301 16.057 2.45801 12C2.80128 10.9081 3.33 9.88346 4.02101 8.971M9.87901 9.879C10.4417 9.31634 11.2048 9.00025 12.0005 9.00025C12.7962 9.00025 13.5594 9.31634 14.122 9.879C14.6847 10.4417 15.0008 11.2048 15.0008 12.0005C15.0008 12.7962 14.6847 13.5593 14.122 14.122M9.87901 9.879L14.122 14.122M9.87901 9.879L14.121 14.12M14.122 14.122L17.413 17.412M9.88101 9.88L6.59101 6.59M6.59101 6.59L3.00101 3M6.59101 6.59C8.20336 5.54957 10.0821 4.9974 12.001 5C16.479 5 20.269 7.943 21.544 12C20.8401 14.2305 19.3784 16.1446 17.412 17.411M6.59101 6.59L17.412 17.411M17.412 17.411L21.001 21' />
    </SvgIcon>
)

VisibilityOff.displayName = 'Icon:VisibilityOff'

export default VisibilityOff
