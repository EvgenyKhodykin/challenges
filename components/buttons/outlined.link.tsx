import classNames from 'classnames'
import Link from 'next/link'
import type { FunctionComponent } from 'react'

import styles from './outlined.link.module.scss'
import type OutlinedProps from './outlined-props.interface'

export type Props = Omit<OutlinedProps, 'variant'>

const Outlined: FunctionComponent<Props> = ({
    className,
    children,
    href,
}: Props): JSX.Element => {
    if (!href) {
        return <></>
    }
    return (
        <Link
            href={href}
            data-testid='button-outlined-general'
            className={classNames(styles.Button, className)}
        >
            {children}
        </Link>
    )
}

Outlined.displayName = 'Button:Outlined.general'

export default Outlined
