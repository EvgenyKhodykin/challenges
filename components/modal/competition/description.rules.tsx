import 'moment/min/locales'

import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Competition from '../../../lib/competitions/competition.interface'

export interface TestIds {
    root?: string
}

export interface Props {
    className?: string
    testIds?: TestIds
    competition: Competition
}

const CompetitionRulesDescription: React.FC<Props> = ({
    className,
    testIds,
    competition,
}: Props): JSX.Element => {
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <div
            className={className}
            data-testid={testIds?.root ?? 'competition-rules-description'}
        >
            <p>
                <b>{t('rules.description.header')}</b>
            </p>
            <ul>
                <li>
                    {t('rules.description.list.maxDailyDrawdown', {
                        count: competition.dailyMaximumDrawdownPercentage,
                    })}
                </li>
                <li>
                    {t('rules.description.list.maxTotalDrawdown', {
                        count: competition.totalMaximumDrawdownPercentage,
                    })}
                </li>
                {competition.minDays > 0 && (
                    <li>
                        {t('rules.description.list.minTradingDays', {
                            count: competition.minDays,
                        })}
                    </li>
                )}
                <li>{t('rules.description.list.noTakingAdvantage')}</li>
            </ul>
            <p>
                {t('rules.description.timingMessage', {
                    startDateTime: moment(competition.startDate)
                        .locale(router.locale as string)
                        .format('lll Z'),
                    endDateTime: moment(competition.endDate)
                        .locale(router.locale as string)
                        .format('lll Z'),
                })}
            </p>
            <p>{t('rules.description.info')}</p>
        </div>
    )
}

CompetitionRulesDescription.displayName = 'Modal:Competition:RulesDescription'

export default CompetitionRulesDescription
