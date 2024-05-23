import isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
    DASHBOARD_LIST_NAME,
    DASHBOARD_LIST_VARIANTS,
} from '../../../lib/client/client.const'
import type Client from '../../../lib/client/client.interface'
import clientVariant from '../../../lib/client/client-variant'
import ClientContext from '../../../lib/client/context'
import type ListProps from '../../../lib/pages/dashboard/list-props.interface'
import TableSkeleton from '../../skeletons/dashboard/list.table'
import TileSkeleton from '../../skeletons/dashboard/list.tile'
import TableView from './list.table'
import TileView from './list.tile'

export interface Props extends ListProps {
    variant?: DASHBOARD_LIST_VARIANTS
}

const Component: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    const client = useContext(ClientContext) as Client
    let variation = variant
    if (!isNil(clientVariant(DASHBOARD_LIST_NAME, client))) {
        variation = clientVariant(DASHBOARD_LIST_NAME, client)
    }
    switch (variation) {
        case DASHBOARD_LIST_VARIANTS.LIST: {
            if (props.state.isFetching) {
                return <TableSkeleton {...props} />
            }
            return <TableView {...props} />
        }
        case DASHBOARD_LIST_VARIANTS.TILE:
        default: {
            if (props.state.isFetching) {
                return <TileSkeleton {...props} />
            }
            return <TileView {...props} />
        }
    }
}

Component.displayName = 'Sections:Dashboard:List'

export default Component
