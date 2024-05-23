/* istanbul ignore file */
import Document, { DocumentProps, Head, Html, Main, NextScript } from 'next/document'

class CustomDocument extends Document<DocumentProps> {
    render(): JSX.Element {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument
