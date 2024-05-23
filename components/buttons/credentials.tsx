import CredentialsCard from './credentials.card'
import CredentialsDetails from './credentials.details'
import type CredentialsProps from './credentials-props.interface'

export type Variant = 'card' | 'details'

export interface Props extends CredentialsProps {
    variant: Variant
}

const Credentials: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'card':
            return <CredentialsCard {...props} />
        case 'details':
            return <CredentialsDetails {...props} />
        default:
            return <></>
    }
}

Credentials.displayName = 'Buttons:Credentials'

export default Credentials
