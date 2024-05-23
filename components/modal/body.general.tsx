import classNames from 'classnames'

import styles from './body.general.module.scss'

export type TestId = string

export interface Props {
    children?: React.ReactNode
    className?: string
    testId?: TestId
}

const Body: React.FC<Props> = ({ children, className, testId }: Props): JSX.Element => (
    <div
        className={classNames(styles.Root, className)}
        data-testid={testId ?? 'modals-body-general'}
    >
        <div className={styles.Inner}>{children}</div>
    </div>
)

Body.displayName = 'Modals:Body.general'

export default Body
