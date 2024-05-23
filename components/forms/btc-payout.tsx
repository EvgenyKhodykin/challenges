import classNames from 'classnames'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'

import { INPUT_BTC_PAYOUT_ADDRESS } from '../../lib/forms/forms.const'
import type { AffiliatesBTCPayoutConfigs as InitialValues } from '../../lib/forms/initial-values.interface'
import Button from '../buttons/primary.submit'
import SaveIcon from '../icons/save-line'
import InputText from '../inputs/text.enter'
import Paper from '../surfaces/paper'
import styles from './btc-payout.module.scss'
import type FormProps from './form-props.interface'

export interface Props extends FormProps<InitialValues> {
    className?: string
}

const Component: React.FC<Props> = ({
    initialValues,
    className,
    i18nNamespace,
}: Props): JSX.Element => {
    const { t } = useTranslation(i18nNamespace)

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            if (values) return
        },
        enableReinitialize: true,
    })

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <span>{t('btcPayout.title')}</span>
            </div>
            <div className={styles.Bottom}>
                <p>{t('btcPayout.description')}</p>
                <div className={styles.Form}>
                    <div className={styles.FormGroup}>
                        <InputText
                            label={t('btcPayout.inputLabel')}
                            name={INPUT_BTC_PAYOUT_ADDRESS}
                            value={formik.values.btc_payout_address}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <Button
                            disabled={!formik.isValid || !formik.dirty}
                            processing={formik.isSubmitting}
                            className={styles.Button}
                        >
                            <SaveIcon className={styles.Icon} />
                            {t('btcPayout.buttonSaveLabel')}
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

Component.displayName = 'Sections:Affiliates:Payout.address'

export default Component
