import type { Theme } from '@mui/material'
import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import classNames from 'classnames'
import Copy from 'components/buttons/copy'
import Download, { Variant as DownloadVariant } from 'components/buttons/download'
import useCredentials from 'lib/challenges/hook.credentials'
import State from 'lib/pages/challenge-details/state.interface'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Button from '../buttons/primary'
import KeyIcon from '../icons/key'
import Body from './body.general'
import styles from './challenge-details.credentials.module.scss'
import Header from './header.general'
import ModalGeneral from './modal.general'

export interface Props {
    state: State
    handleHide: () => void
}

const ChallengeDetails: React.FC<Props> = ({ state, handleHide }: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const router = useRouter()
    const [copiedId, copiedServer, handleCopy] = useCredentials()

    return (
        <ModalGeneral shown={state.isCredentialsShown} handleClose={handleHide}>
            <Header>
                <h4 className={styles.Header}>
                    <KeyIcon className={styles.Icon} />
                    <span className={styles.Text}>{t('credentials.title')}</span>
                </h4>
            </Header>
            <Body>
                <div className={styles.WrapperBody}>
                    <Grid container className={styles.MainContainer}>
                        <Grid item className={styles.Item}>
                            {t('credentials.login')}
                        </Grid>
                        <Grid item className={styles.InnerContainer}>
                            <span className={styles.TextBody}>{state?.challenge.id}</span>
                            <Copy
                                variant='clipboard'
                                handleCopy={handleCopy.bind(
                                    null,
                                    state.challenge.id,
                                    'id'
                                )}
                                className={styles.Copy}
                                copied={copiedId}
                            />
                        </Grid>
                    </Grid>
                    {!isDesktop && (
                        <Grid
                            container
                            className={classNames(styles.MainContainer, styles.Mobile)}
                        >
                            <Grid item className={styles.Item}>
                                {t('credentials.passwords')}
                            </Grid>
                            <Grid
                                item
                                className={classNames(
                                    styles.InnerContainer,
                                    styles.Mobile
                                )}
                            >
                                <span className={styles.TextBody}>
                                    {t('credentials.message')}
                                </span>
                                <Button
                                    className={styles.Reset}
                                    onClick={() => router.push('/forgot')}
                                    variant='general'
                                >
                                    <span className={styles.ResetText}>
                                        {t('credentials.resetPassword')}
                                    </span>
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                    {isDesktop && (
                        <Grid container className={classNames(styles.MainContainer)}>
                            <Grid item className={styles.Item}>
                                {t('credentials.passwords')}
                            </Grid>
                            <Grid item className={classNames(styles.InnerContainer)}>
                                <span className={styles.TextBody}>
                                    {t('credentials.message')}
                                </span>
                                <Button
                                    className={styles.Reset}
                                    onClick={() => router.push('/forgot')}
                                    variant='general'
                                >
                                    <span className={styles.ResetText}>
                                        {t('credentials.resetPassword')}
                                    </span>
                                </Button>
                            </Grid>
                        </Grid>
                    )}

                    <Grid container className={styles.MainContainer}>
                        <Grid item className={styles.Item}>
                            {t('credentials.server')}
                        </Grid>
                        <Grid item className={styles.InnerContainer}>
                            <span className={styles.TextBody}>
                                {state?.challenge.serverName}
                            </span>
                            <Copy
                                variant='clipboard'
                                handleCopy={handleCopy.bind(
                                    null,
                                    state?.challenge.serverName,
                                    'server'
                                )}
                                className={styles.Copy}
                                copied={copiedServer}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={styles.MainContainer}>
                        <Grid item className={styles.Item}>
                            {`${state.challenge.exchangePlatform?.toUpperCase()} ${t(
                                'credentials.platform'
                            )}`}
                        </Grid>
                        <Download
                            variant={state.challenge.exchangePlatform as DownloadVariant}
                        />
                    </Grid>
                </div>
            </Body>
        </ModalGeneral>
    )
}

ChallengeDetails.displayName = 'Modals:ChallengeDetails.credentials'

export default ChallengeDetails
