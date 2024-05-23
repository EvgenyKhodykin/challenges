import classNames from 'classnames'

import MedalIcon from '../icons/medal'
import TrophyIcon from '../icons/trophy'
import styles from './award.module.scss'

export interface Props {
    rank?: number
    className?: string
}

const Award: React.FC<Props> = ({ rank, className, ...props }: Props): JSX.Element => {
    switch (rank) {
        case 1:
            return <TrophyIcon className={className} {...props} />
        case 2:
            return (
                <TrophyIcon className={classNames(styles.Silver, className)} {...props} />
            )
        case 3:
            return (
                <TrophyIcon className={classNames(styles.Bronze, className)} {...props} />
            )
        default:
            return <MedalIcon className={className} {...props} />
    }
}

Award.displayName = 'Badge:Award'

export default Award
