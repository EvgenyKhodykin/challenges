import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './footer.profile.module.scss'
import type FooterProps from './footer-props.interface'

export type Props = Omit<FooterProps, 'variant'>

const Footer: FunctionComponent<Props> = ({
    className,
    children,
}: Props): JSX.Element => (
    <div className={classNames(styles.Footer, className)}>{children}</div>
)

Footer.displayName = 'Drawer:Footer.profile'

export default Footer
