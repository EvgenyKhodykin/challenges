import Tooltip from '@mui/material/Tooltip'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import { addOrdinalSuffix } from '../../lib/utils/dates'
import styles from './competition.laurels.module.scss'
import type Props from './competition-props.interface'

const Competition: React.FC<Props> = ({
    className,
    testIds,
    prizes,
    place = 1,
}: Props): JSX.Element => {
    const { t } = useTranslation('competitions-list')

    const prize = useMemo(() => {
        if (isNil(prizes)) return undefined
        return prizes.pool[place - 1]
    }, [prizes, place])

    return (
        <div
            className={classNames(styles.Root, className, {
                [styles.RootEmpty]: isNil(prizes) || prizes?.pool.every(isNil) || !prize,
            })}
            data-testid={testIds?.root ?? 'prizes-competition-laurels'}
        >
            <Tooltip title={`${addOrdinalSuffix(place)} ${t('prizeLabel')} ${prize}`}>
                <div className={styles.AmountContainer}>{prize}</div>
            </Tooltip>
        </div>
    )
}

Competition.displayName = 'Prizes:Competition.laurels'

export default Competition
