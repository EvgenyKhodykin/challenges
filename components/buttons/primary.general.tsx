import Button from '@mui/material/Button'
import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './primary.general.module.scss'
import type PrimaryProps from './primary-props.interface'

export type Props = Omit<PrimaryProps, 'variant' | 'processing'>

const Primary: FunctionComponent<Props> = ({
    onClick,
    children,
    disabled,
    className,
    testIds,
}: Props): JSX.Element => (
    <Button
        data-testid={testIds?.button ?? 'button-primary-general'}
        type={'button'}
        onClick={onClick}
        disabled={disabled}
        className={classNames(styles.Button, className)}
        disableElevation
    >
        {children}
    </Button>
)

Primary.displayName = 'Buttons:Primary.general'

export default Primary
