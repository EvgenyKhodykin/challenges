import Grid from '@mui/material/Grid'

import {
    CURRENCIES,
    INPUT_CURRENCY,
    INPUT_LANGUAGE,
    LANGUAGES,
} from '../../lib/forms/forms.const'
import useForm from '../../lib/forms/personal-preferences/hook.form'
import Alert from '../alerts'
import Button from '../buttons/primary'
import SaveIcon from '../icons/save-line'
import Select from '../inputs/select'
import Paper from '../surfaces/paper'
import profileStyles from './profile.module.scss'

export interface Props {
    language: string
}

const PersonalPreferences: React.FC<Props> = ({ language }: Props): JSX.Element => {
    const [
        formik,
        successAlertShown,
        errorAlertShown,
        t,
        handleSuccessClose,
        handleErrorClose,
    ] = useForm(language)

    return (
        <>
            <Alert
                duration={10000}
                message={'Failed to update your personal preferences'}
                variant={'error'}
                visible={errorAlertShown}
                onClose={handleErrorClose}
            />
            <Alert
                variant='success'
                duration={10000}
                message={'Your personal preferences were updated successfully'}
                visible={successAlertShown}
                onClose={handleSuccessClose}
            />
            <Paper className={profileStyles.Root}>
                <h2 className={profileStyles.Title}>
                    {t('personalPreferences.form.title')}
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} className={profileStyles.HolderInput}>
                            <Select
                                id='personal-preferences-language'
                                items={LANGUAGES}
                                error={formik.errors.language}
                                touched={formik.touched.language}
                                value={formik.values.language}
                                onChange={formik.handleChange}
                                label={t('personalPreferences.form.language.label')}
                                name={INPUT_LANGUAGE}
                            />
                        </Grid>
                        <Grid item xs={12} className={profileStyles.HolderInput}>
                            <Select
                                id='personal-preferences-currency'
                                items={CURRENCIES}
                                error={formik.errors.currency}
                                touched={formik.touched.currency}
                                value={formik.values.currency}
                                onChange={formik.handleChange}
                                label={t('personalPreferences.form.currency.label')}
                                name={INPUT_CURRENCY}
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

PersonalPreferences.displayName = 'Forms:PersonalPreferences'

export default PersonalPreferences
