import classNames from 'classnames'
import isNil from 'lodash/isNil'

import Prize from './competition'
import styles from './competition.top3.module.scss'
import type Props from './competition-props.interface'

const Competition: React.FC<Props> = ({
    className,
    testIds,
    prizes,
}: Props): JSX.Element => {
    if (isNil(prizes)) {
        return <></>
    }

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'prizes-competition-top3'}
        >
            <div className={styles.Prize1}>
                <div className={styles.Place}>1</div>
                <Prize
                    variant='laurels'
                    place={1}
                    prizes={prizes}
                    className={styles.Prize}
                />
            </div>
            <div className={styles.Prize2}>
                <div className={styles.Place}>2</div>
                <Prize
                    variant='laurels'
                    place={2}
                    prizes={prizes}
                    className={styles.Prize}
                />
            </div>
            <div className={styles.Prize3}>
                <div className={styles.Place}>3</div>
                <Prize
                    variant='laurels'
                    place={3}
                    prizes={prizes}
                    className={styles.Prize}
                />
            </div>
        </div>
    )
}

Competition.displayName = 'Prizes:Competition.laurels'

export default Competition
