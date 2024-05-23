import type { FunctionComponent } from 'react'

import PublicWithoutSteps from './public.without-steps'
import type PublicProps from './public-props.interface'

const Public: FunctionComponent<PublicProps> = ({
    variant,
    ...props
}: PublicProps): JSX.Element => {
    switch (variant) {
        case 'without-steps':
            return <PublicWithoutSteps {...props} />
        default:
            return <></>
    }
}

Public.displayName = 'Layout:Public'

export default Public
