import PrintIcon from '@mui/icons-material/Print'
import Button from '@mui/material/Button'
import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './primary.print.module.scss'
import type Props from './primary-props.interface'

const Primary: FunctionComponent<Props> = ({
    children,
    disabled,
    className,
    testIds,
}: Props): JSX.Element => (
    <Button
        data-testid={testIds?.button ?? 'button-primary-general'}
        type={'button'}
        onClick={() => window.print()}
        disabled={disabled}
        className={classNames(styles.Button, className)}
        disableElevation
    >
        <PrintIcon className={styles.Icon} />
        {children}
    </Button>
)

Primary.displayName = 'Buttons:Primary.print'

export default Primary
