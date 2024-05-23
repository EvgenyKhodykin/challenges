import classNames from 'classnames'
import { useMemo } from 'react'

import { COUNTRIES } from '../../lib/utils/utils.const'
import IconUSA from '../icons/usa'
import styles from './index.module.scss'

export interface Props {
    value?: COUNTRIES
    className?: string
}

const Component: React.FC<Props> = ({ value, className }: Props): JSX.Element => {
    const icon = useMemo(() => {
        switch (value) {
            case COUNTRIES.USA:
            default:
                return <IconUSA className={styles.Icon} />
        }
    }, [value])

    return (
        <div className={classNames(styles.Root, className)}>
            {icon}
            <span className={styles.Text}>{value}</span>
        </div>
    )
}

Component.displayName = 'Country'

Component.defaultProps = {
    value: COUNTRIES.USA,
}

export default Component
