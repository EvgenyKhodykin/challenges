import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import map from 'lodash/map'
import { Fragment } from 'react'

import type Data from '../../lib/challenges/challenge.interface'
import Amount from '../amount/amount'
import type { TestId as BackTestId } from '../buttons/back.mobile'
import BackArrowIcon from '../buttons/back.mobile'
import Credentials from '../buttons/credentials'
import type { CredentialsDetailsTestIds } from '../buttons/credentials-test-ids.interface'
import type { TestIds as ReloadTestIds } from '../buttons/reload'
import Reload from '../buttons/reload'
import Rules from '../buttons/rules'
import type RulesTestIds from '../buttons/rules-test-ids.interface'
import Tag from '../inputs/tag'
import type {
    TestId as StatusTestId,
    Variant as StatusVariant,
} from '../statuses/challenge'
import Status from '../statuses/challenge'
import styles from './details.challenge.module.scss'

export interface TestIds {
    root?: string
    backButton?: BackTestId
    reloadButton?: ReloadTestIds
    status?: StatusTestId
    id?: string
    credentials?: CredentialsDetailsTestIds
    rules?: RulesTestIds
}

export interface Props {
    data: Data
    handleRefresh: React.MouseEventHandler
    handleCredentials: React.MouseEventHandler
    handleRules: React.MouseEventHandler
    isRefreshing?: boolean
    className?: string
    testIds?: TestIds
    isLoading?: boolean
}

const Details: React.FC<Props> = ({
    data,
    className,
    handleRefresh,
    handleCredentials,
    handleRules,
    isRefreshing = true,
    testIds,
    isLoading = false,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'headers-details-challenge-root'}
        >
            {!isDesktop && (
                <div className={styles.TopActions}>
                    <BackArrowIcon className={styles.Back} testId={testIds?.backButton} />
                    <Reload
                        disabled={isRefreshing}
                        onClick={handleRefresh}
                        testIds={testIds?.reloadButton}
                    />
                </div>
            )}
            {!isLoading && (
                <div className={styles.Info}>
                    <Status
                        status={data.status as StatusVariant}
                        className={styles.Status}
                        testId={testIds?.status}
                    />
                    &nbsp;&middot;&nbsp;
                    <span className={styles.Id} data-testid={testIds?.id}>
                        {`#${data.id}`}
                    </span>
                    &nbsp;&middot;&nbsp;
                    <Amount
                        amount={data.account.amount}
                        currency={data.account.currency}
                        position={'append'}
                        className={styles.Amount}
                        superscript
                        kilo
                    />
                </div>
            )}

            <div className={styles.Bottom}>
                {isDesktop && (
                    <div className={styles.Tags}>
                        {map(data.tags, (tag, index) => (
                            <Fragment key={index}>
                                <Tag data={tag} className={styles.Tag} />
                            </Fragment>
                        ))}
                    </div>
                )}
                <div className={styles.BottomActions}>
                    <Credentials
                        variant='details'
                        handleClick={handleCredentials}
                        testIds={testIds?.credentials}
                    />
                    <Rules
                        variant='details'
                        handleClick={handleRules}
                        testIds={testIds?.rules}
                        className={styles.Rules}
                    />
                    {isDesktop && (
                        <Reload
                            disabled={isRefreshing}
                            onClick={handleRefresh}
                            testIds={testIds?.reloadButton}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

Details.displayName = 'Headers:Details.challenge'

export default Details
