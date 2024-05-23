import CheckBox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import classNames from 'classnames'

import useForm from '../../lib/forms/contact-details/hook.form'
import {
    CHECKBOX_NEWSLETTERS_MARKETING,
    COUNTRIES,
    INPUT_ADDRESS_1,
    INPUT_ADDRESS_2,
    INPUT_CITY,
    INPUT_COUNTRY,
    INPUT_EMAIL,
    INPUT_PHONE,
    INPUT_ZIP,
} from '../../lib/forms/forms.const'
import Alert from '../alerts'
import Button from '../buttons/primary'
import SaveIcon from '../icons/save-line'
import Email from '../inputs/email'
import Select from '../inputs/select'
import Text from '../inputs/text'
import Paper from '../surfaces/paper'
import componentStyles from './contact-details.module.scss'
import profileStyles from './profile.module.scss'

const ContactDetails: React.FC = (): JSX.Element => {
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
                message={'Failed to update your contact details'}
                variant={'error'}
                visible={errorAlertShown}
                onClose={handleErrorClose}
            />
            <Alert
                variant='success'
                duration={10000}
                message={'Your contact details were updated successfully'}
                visible={successAlertShown}
                onClose={handleSuccessClose}
            />
            <Paper className={classNames(profileStyles.Root, componentStyles.Root)}>
                <h2 className={profileStyles.Title}>{t('contactDetails.form.title')}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} md={6} className={profileStyles.HolderInput}>
                            <Email
                                variant='enter'
                                id='contact-details-email'
                                error={formik.errors.email}
                                touched={formik.touched.email}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label='Email'
                                name={INPUT_EMAIL}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='contact-details-phone'
                                error={formik.errors.phone}
                                touched={formik.touched.phone}
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('contactDetails.form.phoneNumber.label')}
                                name={INPUT_PHONE}
                            />
                        </Grid>
                        <Grid item xs={12} className={profileStyles.HolderInput}>
                            <Select
                                id='contact-details-country'
                                items={COUNTRIES}
                                error={formik.errors.country}
                                touched={formik.touched.country}
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                label={t('contactDetails.form.country.label')}
                                name={INPUT_COUNTRY}
                            />
                        </Grid>
                        <Grid item xs={12} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='contact-details-address1'
                                error={formik.errors.address1}
                                touched={formik.touched.address1}
                                value={formik.values.address1}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('contactDetails.form.mainAddress.label')}
                                name={INPUT_ADDRESS_1}
                            />
                        </Grid>
                        <Grid item xs={12} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='contact-details-address2'
                                error={formik.errors.address2}
                                touched={formik.touched.address2}
                                value={formik.values.address2}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('contactDetails.form.additionalAddress.label')}
                                name={INPUT_ADDRESS_2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='contact-details-zip'
                                error={formik.errors.zip}
                                touched={formik.touched.zip}
                                value={formik.values.zip}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('contactDetails.form.postCode.label')}
                                name={INPUT_ZIP}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className={profileStyles.HolderInput}>
                            <Text
                                variant='enter'
                                id='contact-details-city'
                                error={formik.errors.city}
                                touched={formik.touched.city}
                                value={formik.values.city}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                label={t('contactDetails.form.city.label')}
                                name={INPUT_CITY}
                            />
                        </Grid>
                        <Grid item xs={12} className={componentStyles.HolderCheckboxes}>
                            <FormControlLabel
                                control={
                                    <CheckBox
                                        checked={formik.values.newsletterMarketing}
                                        onChange={formik.handleChange}
                                        name={CHECKBOX_NEWSLETTERS_MARKETING}
                                    />
                                }
                                label={t('contactDetails.form.checkbox.label')}
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

ContactDetails.displayName = 'Form:ContactDetails'

export default ContactDetails
