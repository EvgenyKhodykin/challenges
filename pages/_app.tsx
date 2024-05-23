/* istanbul ignore file */
import '../styles/globals.scss'

import isEmpty from 'lodash/isEmpty'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type PageWithLayout from '../lib/utils/pages/interface.page.with-layout'
import layoutDefault from '../lib/utils/pages/layout.default'
import PageProps from '../lib/utils/pages/props.base.interface'

const _app = ({ Component, pageProps }: AppProps) => {
    if (typeof window !== 'undefined') {
        if (!sessionStorage.length) {
            // Ask other tabs for session storage
            localStorage.setItem('getSessionStorage', String(Date.now()))
        }

        window.addEventListener('storage', (event) => {
            if (event.key == 'getSessionStorage') {
                // Some tab asked for the sessionStorage -> send it
                localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
                localStorage.removeItem('sessionStorage')
            } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
                // sessionStorage is empty -> fill it
                const data = JSON.parse(event.newValue || '')
                for (const key in data) {
                    sessionStorage.setItem(key, data[key])
                }
            }
        })
    }

    // Set api base url on global object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).apiURL = (pageProps as PageProps).apiURL

    if (isEmpty(pageProps)) {
        return <Component {...pageProps} />
    }

    const onLayout = (Component as NextPage & PageWithLayout).onLayout || layoutDefault

    return onLayout(<Component {...pageProps} />, pageProps)
}

export default _app
