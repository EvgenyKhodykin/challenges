import {
    ShareEmail,
    ShareFacebook,
    ShareTwitter,
} from '../../../lib/utils/share.interface'

export default interface ShareProps {
    variant?: 'facebook' | 'twitter' | 'email'
    data: ShareFacebook | ShareTwitter | ShareEmail
    children?: React.ReactNode | string
    className?: string
}
