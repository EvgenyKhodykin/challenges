import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import type { FunctionComponent } from 'react'

import styles from './visibility.module.scss'

const Visibility: FunctionComponent<SvgIconProps> = (
    props: SvgIconProps
): JSX.Element => (
    <SvgIcon {...props} className={styles.Root}>
        <path d='M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12V12Z' />
        <path d='M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z' />
    </SvgIcon>
)

Visibility.displayName = 'Icon:Visibility'

export default Visibility
