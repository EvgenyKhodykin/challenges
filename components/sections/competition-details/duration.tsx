import 'moment/min/locales'

import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import type Competition from '../../../lib/competitions/competition.interface'
import { DURATION_DATE_OUTPUT_FORMAT } from '../../../lib/competitions/competitions.const'
import formatDurationDays from '../../../lib/competitions/format.duration-days'
import formatDurationTimer from '../../../lib/competitions/format.duration-timer'
import Graph from '../../graphs/linear.competition-duration'
import IconClock from '../../icons/clock'
import Paper from '../../surfaces/paper'
import styles from './duration.module.scss'

export interface Props {
    className?: string
    competition: Competition
}

const Component: React.FC<Props> = ({ className, competition }: Props): JSX.Element => {
    const { t } = useTranslation('competitions-details')
    const data = { startDate: competition.startDate, endDate: competition.endDate }
    const days = formatDurationDays(data)
    const timer = formatDurationTimer(data)
    const router = useRouter()

    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('lg'))

    const shownTime = useMemo(() => {
        if (competition.status === 'closed') {
            return (
                <span className={styles.Ends}>
                    {t('common:endedOn')}:{' '}
                    <span>
                        {moment(competition.endDate)
                            .locale(router.locale as string)
                            .format('ll')}
                    </span>
                </span>
            )
        }
        return (
            <>
                <span className={styles.Ends}>
                    {t('common:endsIn')}: <span>{timer}</span>
                </span>
                <span className={styles.TimeLeft}>{days}</span>
            </>
        )
    }, [competition, router, timer, days, t])

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconClock className={styles.Chart} />
                    </span>
                    <span className={styles.Text}>
                        {t('standings.leftBoard.duration.header')}
                    </span>
                </div>
                {!isDesktop && (
                    <span className={styles.CurrentDate}>
                        {moment().format(DURATION_DATE_OUTPUT_FORMAT)}
                    </span>
                )}
                <Graph className={styles.Graph} data={data} />
            </div>
            <div className={styles.Bottom}>{shownTime}</div>
        </Paper>
    )
}

Component.displayName = 'Sections:CompetitionDetails:Duration'

export default Component
