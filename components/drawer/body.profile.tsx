import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './body.profile.module.scss'
import type BodyProps from './body-props.interface'

export type Props = Omit<BodyProps, 'variant'>

const Body: FunctionComponent<Props> = ({ className, children }: Props): JSX.Element => (
    <div data-testid='drawer-body-profile' className={classNames(styles.Body, className)}>
        {children}
    </div>
)

Body.displayName = 'Drawer:Body.profile'

export default Body
