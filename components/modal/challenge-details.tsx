import Credentials from './challenge-details.credentials'
import Rules from './challenge-details.rules'
import ChallengeDetailsProps from './challenge-details-props.interface'

export type Variant = 'credentials' | 'rules'

export interface Props extends ChallengeDetailsProps {
    variant: Variant
}

const ChallengeDetails: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'credentials':
            return <Credentials {...props} />
        case 'rules':
            return <Rules {...props} />
        default:
            return <></>
    }
}

ChallengeDetails.displayName = 'Modals:ChallengeDetails'

export default ChallengeDetails
