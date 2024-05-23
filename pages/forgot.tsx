import { useFormik } from 'formik'
import partial from 'lodash/partial'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import React from 'react'
import * as Yup from 'yup'

import Alert from '../components/alerts'
import Button from '../components/buttons/primary'
import Email from '../components/inputs/email'
import Layout from '../components/layouts/public'
import Wrapper from '../components/layouts/wrapper'
import Logo from '../components/logos/company'
import apiPasswordForgotten from '../lib/api/password-forgotten'
import getPageServerSideProps from '../lib/pages/forgot/get-server-side-props'
import type Props from '../lib/pages/forgot/props.interface'
import styles from './forgot.module.scss'

const Forgot: NextPage<Props> = ({ client }: Props): JSX.Element => {
    const { t } = useTranslation('forgot')
    const [errorAlertShown, setErrorAlertShown] = useState<boolean>(false)
    const [successAlertShown, setSuccessAlertShown] = useState<boolean>(false)

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('form.email.invalid'))
            .required(t('form.email.required')),
    })

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema,
        onSubmit: async ({ email }) => {
            const result = await apiPasswordForgotten(email)

            if (!result) {
                return setErrorAlertShown(true)
            }

            return setSuccessAlertShown(true)
        },
    })
    return (
        <Wrapper variant='public'>
            <Alert
                duration={10000}
                message={t('form.error')}
                variant={'error'}
                visible={errorAlertShown}
                onClose={partial(setErrorAlertShown, false)}
            />
            <Alert
                variant='success'
                duration={10000}
                message={t('form.success')}
                visible={successAlertShown}
                onClose={partial(setSuccessAlertShown, false)}
            />
            <Layout
                variant='without-steps'
                heading={<h1>{t('title')}</h1>}
                logo={<Logo variant='public' data={client} />}
                bottom={<p>{t('common:jurisdictionalDisclaimer')}</p>}
            >
                <form className={styles.Form} onSubmit={formik.handleSubmit}>
                    <Email
                        id='email'
                        className={styles.Input}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label={t('form.email.label')}
                        name='email'
                    />
                    <Button
                        variant='async'
                        disabled={!formik.dirty || !formik.isValid}
                        processing={formik.isSubmitting}
                    >
                        {t('resetPassword')}
                    </Button>
                    <div className={styles.Login}>
                        <p>
                            {t('knowYourPassword')}
                            <Link
                                href={'/login'}
                                className={styles.Link}
                                data-testid={'link-login'}
                            >
                                {t('common:login')}
                            </Link>
                        </p>
                    </div>
                </form>
            </Layout>
        </Wrapper>
    )
}

export default Forgot

export const getServerSideProps: GetServerSideProps<Props> = getPageServerSideProps
