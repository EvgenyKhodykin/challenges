import Button from '@mui/material/Button'
import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './outlined.general.module.scss'
import type OutlinedProps from './outlined-props.interface'

export type Props = Omit<OutlinedProps, 'variant'>

const Outlined: FunctionComponent<Props> = ({
    className,
    onClick,
    children,
    disabled,
}: Props): JSX.Element => (
    <Button
        data-testid='button-outlined-general'
        className={classNames(styles.Button, className)}
        onClick={onClick}
        disabled={disabled}
        type='button'
        variant='outlined'
    >
        {children}
    </Button>
)

Outlined.displayName = 'Button:Outlined.general'

export default Outlined
