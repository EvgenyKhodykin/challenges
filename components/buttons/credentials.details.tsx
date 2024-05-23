import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import KeyIcon from '../icons/key'
import styles from './credentials.details.module.scss'
import type Props from './credentials-props.interface'
import type { CredentialsDetailsTestIds as TestIds } from './credentials-test-ids.interface'

const Credentials: React.FC<Props> = ({
    className,
    handleClick = () => undefined,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')

    return (
        <button
            type='button'
            className={classNames(styles.Root, className)}
            onClick={handleClick}
            data-testid={
                (testIds as TestIds)?.button ?? 'buttons-credentials-details-root'
            }
        >
            <KeyIcon className={styles.Key} />
            <span
                className={styles.Text}
                data-testid={
                    (testIds as TestIds)?.text ?? 'buttons-credentials-details-text'
                }
            >
                {t('credentials.title')}
            </span>
            <ChevronRightIcon className={styles.Arrow} />
        </button>
    )
}

Credentials.displayName = 'Buttons:Credentials.details'

export default Credentials
