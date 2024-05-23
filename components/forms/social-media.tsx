import Grid from '@mui/material/Grid'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import Link from 'next/link'

import { INPUT_INSTAGRAM, INPUT_TWITTER } from '../../lib/forms/forms.const'
import useForm from '../../lib/forms/social-media/hook.form'
import Alert from '../alerts'
import Button from '../buttons/primary'
import InstagramIcon from '../icons/instagram'
import OpenIcon from '../icons/open'
import SaveIcon from '../icons/save-line'
import TwitterIcon from '../icons/twitter'
import Text from '../inputs/text'
import Paper from '../surfaces/paper'
import profileStyles from './profile.module.scss'
import componentStyles from './social-media.module.scss'

const SocialMedia: React.FC = (): JSX.Element => {
    const [
        formik,
        successAlertShown,
        errorAlertShown,
        t,
        handleSuccessClose,
        handleErrorClose,
    ] = useForm()
    return (
        <>
            <Alert
                duration={10000}
                message={t('socialMedia.form.error')}
                variant={'error'}
                visible={errorAlertShown}
                onClose={handleErrorClose}
            />
            <Alert
                variant='success'
                duration={10000}
                message={t('socialMedia.form.success')}
                visible={successAlertShown}
                onClose={handleSuccessClose}
            />
            <Paper className={classNames(profileStyles.Root, componentStyles.Root)}>
                <h2 className={profileStyles.Title}>{t('socialMedia.form.title')}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12}>
                            <div className={profileStyles.HolderInput}>
                                <Grid container columnSpacing={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        md={3}
                                        className={componentStyles.HolderSocialLabel}
                                    >
                                        <span>Instagram</span>
                                        <InstagramIcon />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={3}
                                        className={componentStyles.HolderDomain}
                                    >
                                        <span>instagram.com/</span>
                                    </Grid>
                                    <Grid item xs={11} md={5}>
                                        <Text
                                            variant='enter'
                                            id='social-media-instagram'
                                            error={formik.errors.instagram}
                                            touched={formik.touched.instagram}
                                            value={formik.values.instagram}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            label={t('socialMedia.form.instagram.label')}
                                            name={INPUT_INSTAGRAM}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        className={componentStyles.HolderLink}
                                    >
                                        {!isEmpty(formik.values.instagram) &&
                                            !formik.errors.instagram && (
                                                <Link
                                                    href={`https://instagram.com/${formik.values.instagram}`}
                                                    target={'_blank'}
                                                >
                                                    <OpenIcon />
                                                </Link>
                                            )}
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={profileStyles.HolderInput}>
                                <Grid container columnSpacing={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        md={3}
                                        className={classNames(
                                            componentStyles.HolderSocialLabel
                                        )}
                                    >
                                        <span>Twitter</span>
                                        <TwitterIcon />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={3}
                                        className={componentStyles.HolderDomain}
                                    >
                                        <span>twitter.com/</span>
                                    </Grid>
                                    <Grid item xs={11} md={5}>
                                        <Text
                                            variant='enter'
                                            id='social-media-twitter'
                                            error={formik.errors.twitter}
                                            touched={formik.touched.twitter}
                                            value={formik.values.twitter}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            label={t('socialMedia.form.twitter.label')}
                                            name={INPUT_TWITTER}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        className={componentStyles.HolderLink}
                                    >
                                        {!isEmpty(formik.values.twitter) &&
                                            !formik.errors.twitter && (
                                                <Link
                                                    href={`https://twitter.com/${formik.values.twitter}`}
                                                    target={'_blank'}
                                                >
                                                    <OpenIcon />
                                                </Link>
                                            )}
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid className={profileStyles.HolderButton} item xs={12}>
                            <Button
                                variant='async'
                                disabled={!formik.isValid}
                                processing={formik.isSubmitting}
                                className={profileStyles.Button}
                            >
                                <SaveIcon className={profileStyles.SaveIcon} />
                                {t('saveButton')}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

SocialMedia.displayName = 'Forms:SocialMedia'

export default SocialMedia
