import classNames from 'classnames'

import KeyIcon from '../icons/key'
import styles from './credentials.card.module.scss'
import type Props from './credentials-props.interface'
import type { CredentialsCardTestId as TestId } from './credentials-test-ids.interface'

const Credentials: React.FC<Props> = ({
    handleClick = () => undefined,
    testIds,
    className,
}: Props): JSX.Element => (
    <button
        type='button'
        className={classNames(styles.Root, className)}
        onClick={handleClick}
        data-testid={(testIds as TestId) ?? 'buttons-credentials-card'}
    >
        <KeyIcon />
    </button>
)

Credentials.displayName = 'Buttons:Credentials.card'

export default Credentials
