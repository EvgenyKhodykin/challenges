import type { NextPage } from 'next'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import type { ReactElement } from 'react'

import type PageWithLayout from '../lib/utils/pages/interface.page.with-layout'
import styles from './404.module.scss'

const Error404: NextPage & PageWithLayout = (): JSX.Element => {
    const { t } = useTranslation('404')

    return (
        <div className={styles.container}>
            <Head>
                <title>{t('title')}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <h1>{t('title')}</h1>
        </div>
    )
}

Error404.onLayout = (page: ReactElement) => <>{page}</>

Error404.displayName = 'Page:Error404'

export default Error404
