import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import styles from './paper.module.scss'
import type PaperProps from './paper-props.interface'

export type Props = Omit<PaperProps, 'variant'>

const Paper: FunctionComponent<Props> = ({
    children,
    className,
    dataTestId,
    id,
}: Props): JSX.Element => (
    <div
        id={id}
        className={classNames(styles.Root, className)}
        data-testid={dataTestId ?? 'surface-paper-general'}
    >
        {children}
    </div>
)

Paper.displayName = 'Surface:Paper.general'

export default Paper
