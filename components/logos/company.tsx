import type { FunctionComponent } from 'react'

import CompanyPublic from './company.public'
import type CompanyProps from './company-props.interface'

const Company: FunctionComponent<CompanyProps> = ({
    variant,
    ...props
}: CompanyProps): JSX.Element => {
    switch (variant) {
        case 'public':
        default:
            return <CompanyPublic {...props} />
    }
}

Company.displayName = 'Logo:Company'

export default Company
