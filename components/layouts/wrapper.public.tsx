import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './wrapper.public.module.scss'
import type WrapperProps from './wrapper-props.interface'

export type Props = Omit<WrapperProps, 'variant'>

const Wrapper: FunctionComponent<Props> = ({
    children,
    className,
}: Props): JSX.Element => (
    <div
        data-testid='layout-wrapper-public'
        style={{ width: '100vw', height: '100vh' }}
        className={classNames(styles.Wrapper, className)}
    >
        {children}
    </div>
)

Wrapper.displayName = 'Layout:Wrapper.public'

export default Wrapper
