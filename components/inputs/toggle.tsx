import isEmpty from 'lodash/isEmpty'

import type ToggleLinkItem from '../../lib/forms/toggle-link-item.interface'
import type { ToggleGeneralItem } from '../../lib/utils/toggle-items.interface'
import ToggleGeneral from './toggle.general'
import ToggleLink from './toggle.link'
import type ToggleProps from './toggle-props.interface'

export interface Props extends ToggleProps<ToggleLinkItem | ToggleGeneralItem> {
    variant?: 'link' | 'general'
}

const Toggle: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    if (isEmpty(props.items)) {
        return <></>
    }

    switch (variant) {
        case 'link':
            return <ToggleLink {...props} items={props.items as Array<ToggleLinkItem>} />
        case 'general':
        default:
            return (
                <ToggleGeneral
                    {...props}
                    items={props.items as Array<ToggleGeneralItem>}
                />
            )
    }
}

Toggle.displayName = 'Input:Toggle'

export default Toggle
