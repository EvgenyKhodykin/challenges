import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'
import type { FunctionComponent, MouseEventHandler } from 'react'

import BurgerIcon from '../icons/burger'
import styles from './burger.lines.module.scss'

export interface Props {
    className?: string
    onClick: MouseEventHandler<HTMLButtonElement | undefined>
}

const Burger: FunctionComponent<Props> = ({ className, onClick }: Props): JSX.Element => (
    <IconButton
        className={classNames(styles.Button, className)}
        onClick={onClick}
        data-testid='button-burger-lines'
    >
        <BurgerIcon className={styles.Icon} />
    </IconButton>
)

Burger.displayName = 'Button:Burger.lines'

export default Burger
