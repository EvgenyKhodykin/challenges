import isNil from 'lodash/isNil'

import ListFailed from './failed.list'
import TileFailed from './failed.tile'
import TileNew from './new'
import ListNew from './new.list'
import ListOngoing from './ongoing.list'
import TileOngoing from './ongoing.tile'
import ListPassed from './passed.list'
import TilePassed from './passed.tile'
import type DashboardProps from './props.interface'

export enum Variant {
    TILE_NEW,
    TILE_ONGOING,
    TILE_PASSED,
    TILE_FAILED,
    TILE_CREATED,
    TABLE_NEW,
    TABLE_ONGOING,
    TABLE_PASSED,
    TABLE_FAILED,
    TABLE_CREATED,
}

export interface Props extends DashboardProps {
    variant: Variant
    isTile?: boolean
}

const Challenge: React.FC<Props> = ({
    variant,
    isTile = true,
    ...props
}: Props): JSX.Element => {
    if (![Variant.TILE_NEW, Variant.TABLE_NEW].includes(variant) && isNil(props.data)) {
        return <></>
    }

    switch (variant) {
        case Variant.TILE_FAILED:
            return <TileFailed {...props} />
        case Variant.TILE_NEW:
            return <TileNew {...props} />
        case Variant.TILE_ONGOING:
            return <TileOngoing {...props} />
        case Variant.TILE_PASSED:
            return <TilePassed {...props} />
        case Variant.TABLE_FAILED:
            return <ListFailed {...props} />
        case Variant.TABLE_NEW:
            return <ListNew {...props} />
        case Variant.TABLE_ONGOING:
            return <ListOngoing {...props} />
        case Variant.TABLE_PASSED:
            return <ListPassed {...props} />
        default:
            return isTile ? <TileFailed {...props} /> : <ListFailed {...props} />
    }
}

Challenge.displayName = 'Cards:Challenge'

export default Challenge
