import { LIST_VARIANTS } from 'lib/competitions/competitions.const'
import useTranslation from 'next-translate/useTranslation'

import type ListProps from '../../../lib/pages/competitions-list/list-props.interface'
import styles from '../../../pages/competitions/competitions-list.module.scss'
import TileSkeleton from '../../skeletons/competitions/list.tile'
import TileView from './list.tile'

export interface Props extends ListProps {
    variant?: LIST_VARIANTS
}

const Component: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    const { t } = useTranslation('competitions-list')
    const variation = variant

    switch (variation) {
        case LIST_VARIANTS.TILE:
        default: {
            if (props.state.isFetching) {
                return <TileSkeleton {...props} />
            } else if (props.state.filtered.length === 0) {
                return (
                    <h3 className={styles.emptyList}>
                        {t('emptyList.message', {
                            status: props.handleShowMessage(props.state.filterValue),
                        })}
                    </h3>
                )
            }
            return <TileView {...props} />
        }
    }
}

Component.displayName = 'Lists:Competitions:List'

export default Component
