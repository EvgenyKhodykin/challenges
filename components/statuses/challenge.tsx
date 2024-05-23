import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import { ACCOUNTS_STATUS } from '../../lib/accounts/accounts.const'
import styles from './challenge.module.scss'

export type TestId = string

export type Variant =
    | ACCOUNTS_STATUS.FAILED
    | ACCOUNTS_STATUS.ONGOING
    | ACCOUNTS_STATUS.PASSED

export interface Props {
    status: Variant
    displayVariant?: 'card' | 'preview'
    className?: string
    testId?: TestId
}

const Challenge: React.FC<Props> = ({
    status,
    displayVariant,
    className,
    testId,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')

    return (
        <span
            className={classNames(
                styles.Root,
                {
                    [styles.Passed]: status === 'passed',
                    [styles.Failed]: status === 'failed',
                    [styles.Ongoing]: status === 'ongoing',
                    [styles.Preview]: displayVariant === 'preview',
                },

                className
            )}
            data-testid={testId ?? 'statuses-challenge'}
        >
            {status === 'passed' && t('challengeTiles.status.passed')}
            {status === 'failed' && t('challengeTiles.status.failed')}
            {status === 'ongoing' && t('challengeTiles.status.ongoing')}
        </span>
    )
}

Challenge.displayName = 'Statuses:Challenges'

export default Challenge
