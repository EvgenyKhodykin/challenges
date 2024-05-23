import type { NextPage } from 'next'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

const Error500: NextPage = (): JSX.Element => {
    const { t } = useTranslation('500')

    return (
        <div>
            <Head>
                <title>{t('title')}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <h1>{t('title')}</h1>
        </div>
    )
}

Error500.displayName = 'Page:Error500'

export default Error500
