import type { FunctionComponent } from 'react'

import FooterProfile from './footer.profile'
import type FooterProps from './footer-props.interface'

const Footer: FunctionComponent<FooterProps> = ({
    variant,
    ...props
}: FooterProps): JSX.Element => {
    switch (variant) {
        case 'profile':
            return <FooterProfile {...props} />
        default:
            return <></>
    }
}

Footer.displayName = 'Drawer:Footer'

export default Footer
