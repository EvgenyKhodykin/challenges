import type MenuItem from '../../lib/navigation/menu-item.interface'
import Profile from './drawer.profile'

export type Variants = 'profile'

export interface Props {
    variant: Variants
    menu: Array<MenuItem>
}

const Component: React.FC<Props> = ({ variant, ...rest }: Props): JSX.Element => {
    switch (variant) {
        case 'profile':
            return <Profile {...rest} />
        default:
            return <></>
    }
}

export default Component
