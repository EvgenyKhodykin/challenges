import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import useCredentials from 'lib/challenges/hook.credentials'
import { DASHBOARD_LIST_VARIANTS } from 'lib/client/client.const'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Copy from '../buttons/copy'
import type { ClipboardTestIds } from '../buttons/copy-test-ids.interface'
import Download, { Variant as DownloadVariant } from '../buttons/download'
import type { DownloadMetaTraderTestIds } from '../buttons/download-test-ids.interface'
import styles from './body.credentials.module.scss'
import Footer from './footer.credentials'

export interface TestIds {
    root?: string
    challengeID?: string
    login?: string
    server?: string
    copyClipboardButton?: ClipboardTestIds
    downloadButton?: DownloadMetaTraderTestIds
}

export interface Props {
    id: string
    server: string
    exchangePlatform: string
    className?: string
    testIds?: TestIds
    variant?: DASHBOARD_LIST_VARIANTS
}

const Body: React.FC<Props> = ({
    id,
    server,
    exchangePlatform,
    className,
    testIds,
    variant = DASHBOARD_LIST_VARIANTS.TILE,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')
    const [copiedId, copiedServer, handleCopy] = useCredentials()
    const router = useRouter()
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    if (variant === DASHBOARD_LIST_VARIANTS.LIST) {
        return (
            <div
                className={classNames(styles.Root, className)}
                data-testid={testIds?.root ?? 'modals-body-credentials-root'}
            >
                <div className={styles.CopyWrapper}>
                    <p className={styles.ChallengeIDList}>
                        <span>{t('challengeTiles.credentials.challengeId')}</span>
                        <span
                            data-testid={
                                testIds?.challengeID ??
                                'modals-body-credentials-challenge-id'
                            }
                        >
                            {`#${id}`}
                        </span>
                    </p>
                    <div className={styles.CredentialList}>
                        <span>{t('challengeTiles.credentials.login')}</span>
                        <span
                            data-testid={
                                testIds?.login ?? 'modals-body-credentials-login'
                            }
                        >
                            {id}
                        </span>
                        <Copy
                            variant='clipboard'
                            handleCopy={handleCopy.bind(null, id, 'id')}
                            className={styles.Copy}
                            copied={copiedId}
                            testIds={testIds?.copyClipboardButton}
                        />
                    </div>
                    <div className={styles.CredentialList}>
                        <span>{t('challengeTiles.credentials.server')}</span>
                        <span
                            data-testid={
                                testIds?.server ?? 'modals-body-credentials-server'
                            }
                        >
                            {server}
                        </span>
                        <Copy
                            variant='clipboard'
                            handleCopy={handleCopy.bind(null, server, 'server')}
                            className={styles.Copy}
                            copied={copiedServer}
                            testIds={testIds?.copyClipboardButton}
                        />
                    </div>
                </div>
                {isDesktop && (
                    <div className={styles.ButtonWrapper}>
                        <div className={styles.Download}>
                            <Download
                                variant={exchangePlatform as DownloadVariant}
                                testIds={testIds?.downloadButton}
                            />
                        </div>
                        <Footer
                            className={styles.Footer}
                            handleResetPassword={() => router.push('/forgot')}
                        />
                    </div>
                )}
            </div>
        )
    }

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'modals-body-credentials-root'}
        >
            <p className={styles.ChallengeID}>
                <span>{t('challengeTiles.credentials.challengeId')}</span>
                <span
                    data-testid={
                        testIds?.challengeID ?? 'modals-body-credentials-challenge-id'
                    }
                >
                    {`#${id}`}
                </span>
            </p>
            <div className={styles.Credential}>
                <span>{t('challengeTiles.credentials.login')}</span>
                <span data-testid={testIds?.login ?? 'modals-body-credentials-login'}>
                    {id}
                </span>
                <Copy
                    variant='clipboard'
                    handleCopy={handleCopy.bind(null, id, 'id')}
                    className={styles.Copy}
                    copied={copiedId}
                    testIds={testIds?.copyClipboardButton}
                />
            </div>
            <div className={styles.Credential}>
                <span>{t('challengeTiles.credentials.server')}</span>
                <span data-testid={testIds?.server ?? 'modals-body-credentials-server'}>
                    {server}
                </span>
                <Copy
                    variant='clipboard'
                    handleCopy={handleCopy.bind(null, server, 'server')}
                    className={styles.Copy}
                    copied={copiedServer}
                    testIds={testIds?.copyClipboardButton}
                />
            </div>
            <div className={styles.Download}>
                <Download
                    variant={exchangePlatform as DownloadVariant}
                    testIds={testIds?.downloadButton}
                />
            </div>
        </div>
    )
}

Body.displayName = 'Modals:Body.credentials'

export default Body
