import type { FunctionComponent } from 'react'

import ShareEmail from './share.email'
import ShareFacebook from './share.facebook'
import ShareTwitter from './share.twitter'
import type ShareProps from './share-props.interface'

const Share: FunctionComponent<ShareProps> = ({
    variant,
    ...props
}: ShareProps): JSX.Element => {
    switch (variant) {
        case 'facebook':
            return <ShareFacebook {...props} />
        case 'twitter':
            return <ShareTwitter {...props} />
        case 'email':
            return <ShareEmail {...props} />
        default:
            return <></>
    }
}

Share.displayName = 'Button:Share'

export default Share
