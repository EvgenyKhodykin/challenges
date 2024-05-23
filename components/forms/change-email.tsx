import classNames from 'classnames'
import useForm from 'lib/forms/change-email/hook.form'

import { INPUT_EMAIL, INPUT_PASSWORD } from '../../lib/forms/forms.const'
import Alert from '../alerts'
import Button from '../buttons/primary'
import SaveIcon from '../icons/save-line'
import Email from '../inputs/email'
import Password from '../inputs/password'
import Paper from '../surfaces/paper'
import componentStyles from './change-email.module.scss'
import profileStyles from './profile.module.scss'

export interface Props {
    className?: string
}

const ChangeEmail: React.FC<Props> = ({ className }: Props): JSX.Element => {
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
                message={t('changeEmail.form.error')}
                variant={'error'}
                visible={errorAlertShown}
                onClose={handleErrorClose}
            />
            <Alert
                variant='success'
                duration={10000}
                message={t('changeEmail.form.success')}
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
                <h2 className={profileStyles.Title}>{t('changeEmail.form.title')}</h2>
                <form className={componentStyles.Form} onSubmit={formik.handleSubmit}>
                    <div className={componentStyles.HolderInputs}>
                        <div className={profileStyles.HolderInput}>
                            <Email
                                variant='enter'
                                id='change-email-email'
                                error={formik.errors.email}
                                touched={formik.touched.email}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('changeEmail.form.email.label')}
                                name={INPUT_EMAIL}
                            />
                        </div>
                        <div className={profileStyles.HolderInput}>
                            <Password
                                variant='enter'
                                id='change-email-password'
                                error={formik.errors.password}
                                touched={formik.touched.password}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('changeEmail.form.password.label')}
                                name={INPUT_PASSWORD}
                                helper={t('changeEmail.form.password.helper')}
                            />
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

ChangeEmail.displayName = 'Forms:ChangeEmail'

export default ChangeEmail
