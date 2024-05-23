import DownloadIcon from '@mui/icons-material/FileDownloadOutlined'
import Link from '@mui/material/Link'
import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './outlined.download.module.scss'
import type OutlinedProps from './outlined-props.interface'

export type Props = Omit<OutlinedProps, 'variant'>

const Outlined: FunctionComponent<Props> = ({
    className,
    onClick,
    children,
}: Props): JSX.Element => (
    <Link
        data-testid='button-outlined-general'
        className={classNames(styles.Button, className)}
        onClick={onClick}
    >
        <DownloadIcon className={styles.Icon} />
        {children}
    </Link>
)

Outlined.displayName = 'Button:Outlined.download'

export default Outlined
