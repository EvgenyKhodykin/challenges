import classNames from 'classnames'
import useForm from 'lib/forms/change-password/hook.form'
import Link from 'next/link'

import { INPUT_NEW_PASSWORD, INPUT_OLD_PASSWORD } from '../../lib/forms/forms.const'
import Alert from '../alerts'
import Button from '../buttons/primary'
import SaveIcon from '../icons/save-line'
import Password from '../inputs/password'
import Paper from '../surfaces/paper'
import componentStyles from './change-password.module.scss'
import profileStyles from './profile.module.scss'

export interface Props {
    className?: string
}

const ChangePassword: React.FC<Props> = ({ className }: Props): JSX.Element => {
    const [
        formik,
        errorAlertShown,
        successAlertShown,
        t,
        handleSuccessClose,
        handleErrorClose,
    ] = useForm()

    return (
        <>
            <Alert
                duration={10000}
                message={t('changePassword.form.error')}
                variant={'error'}
                visible={errorAlertShown}
                onClose={handleErrorClose}
            />
            <Alert
                variant='success'
                duration={10000}
                message={t('changePassword.form.success')}
                visible={successAlertShown}
                onClose={handleSuccessClose}
            />
            <Paper
                className={classNames(
                    profileStyles.Root,
                    componentStyles.Root,
                    className
                )}
            >
                <h2 className={profileStyles.Title}>{t('changePassword.form.title')}</h2>
                <form className={componentStyles.Form} onSubmit={formik.handleSubmit}>
                    <div className={componentStyles.HolderInputs}>
                        <div className={profileStyles.HolderInput}>
                            <Password
                                variant='enter'
                                id='change-password-old-password'
                                error={formik.errors.oldPassword}
                                touched={formik.touched.oldPassword}
                                value={formik.values.oldPassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('changePassword.form.oldPassword.label')}
                                name={INPUT_OLD_PASSWORD}
                                helper={t('changePassword.form.oldPassword.helper')}
                            />
                        </div>
                        <div className={profileStyles.HolderInput}>
                            <Password
                                variant='new'
                                id='change-password-new-password'
                                error={formik.errors.newPassword}
                                touched={formik.touched.newPassword}
                                value={formik.values.newPassword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('changePassword.form.newPassword.label')}
                                name={INPUT_NEW_PASSWORD}
                            />
                            <div className={componentStyles.ForgotPasswordContainer}>
                                <Link
                                    className={componentStyles.ForgotPasswordLink}
                                    href={'/forgot'}
                                    target={'_blank'}
                                >
                                    {t('changePassword.form.forgotPassword')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={profileStyles.HolderButton}>
                        <Button
                            variant='async'
                            disabled={!formik.isValid || !formik.dirty}
                            processing={formik.isSubmitting}
                            className={profileStyles.Button}
                        >
                            <SaveIcon className={profileStyles.SaveIcon} />
                            {t('saveButton')}
                        </Button>
                    </div>
                </form>
            </Paper>
        </>
    )
}

ChangePassword.displayName = 'Forms:ChangePassword'

export default ChangePassword
