import type Filters from '../../../lib/pages/dashboard/filters.interface'
import type { DASHBOARD_FILTERS_CHALLENGE_TYPE } from '../../../lib/utils/utils.const'

export default interface FiltersProps {
    filters: Filters
    onFilterType: (value: Array<DASHBOARD_FILTERS_CHALLENGE_TYPE>) => void
    className?: string
}
