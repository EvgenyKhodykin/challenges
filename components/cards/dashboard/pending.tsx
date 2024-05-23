import PendingTile from './pending.tile'
import type PendingProps from './pending-props.interface'

export enum Variant {
    TILE,
    LIST,
}

export interface Props extends PendingProps {
    variant: Variant
}

const Component: React.FC<Props> = ({ variant, ...props }): JSX.Element => {
    switch (variant) {
        case Variant.TILE:
            return <PendingTile {...props} />
        default:
            return <></>
    }
}

export default Component
