/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin')

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
}

module.exports = nextTranslate({
    ...nextConfig,
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/',
                permanent: true,
            },
        ]
    },
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
    },
})
