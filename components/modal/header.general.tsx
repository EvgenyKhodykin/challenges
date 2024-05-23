import classNames from 'classnames'

import styles from './header.general.module.scss'

export type TestId = string

export interface Props {
    children?: React.ReactNode
    className?: string
    testId?: TestId
}

const Header: React.FC<Props> = ({ children, className, testId }: Props): JSX.Element => (
    <div
        className={classNames(styles.Root, className)}
        data-testid={testId ?? 'modals-header-general'}
    >
        {children}
    </div>
)

Header.displayName = 'Modals:Header.general'

export default Header
