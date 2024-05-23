import Grid from '@mui/material/Grid'

import {
    INPUT_FIRST_NAME,
    INPUT_LAST_NAME,
    INPUT_NICKNAME,
} from '../../lib/forms/forms.const'
import useForm from '../../lib/forms/personal-info/hook.form'
import Alert from '../alerts'
import Button from '../buttons/primary'
import SaveIcon from '../icons/save-line'
import Text from '../inputs/text'
import Paper from '../surfaces/paper'
import profileStyles from './profile.module.scss'

const PersonalInfo: React.FC = (): JSX.Element => {
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
                message={t('personalInfo.form.error')}
                variant={'error'}
                visible={errorAlertShown}
                onClose={handleErrorClose}
            />
            <Alert
                variant='success'
                duration={10000}
                message={t('personalInfo.form.success')}
                visible={successAlertShown}
                onClose={handleSuccessClose}
            />
            <Paper className={profileStyles.Root}>
                <h2 className={profileStyles.Title}>{t('personalInfo.form.title')}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} md={6} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='first-name'
                                error={formik.errors.firstName}
                                touched={formik.touched.firstName}
                                value={formik.values.firstName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('personalInfo.form.firstName.label')}
                                name={INPUT_FIRST_NAME}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='last-name'
                                error={formik.errors.lastName}
                                touched={formik.touched.lastName}
                                value={formik.values.lastName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('personalInfo.form.lastName.label')}
                                name={INPUT_LAST_NAME}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='nickname'
                                error={formik.errors.nickname}
                                touched={formik.touched.nickname}
                                value={formik.values.nickname}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('personalInfo.form.nickname.label')}
                                name={INPUT_NICKNAME}
                                helper={t('personalInfo.form.nickname.helper')}
                            />
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

PersonalInfo.displayName = 'Forms:PersonalInfo'

export default PersonalInfo
