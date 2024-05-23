import 'moment/min/locales'

import Challenge from 'lib/challenges/challenge.interface'
import { getPercentage } from 'lib/utils/amount'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

export interface TestIds {
    root?: string
}

export interface Props {
    challenge: Challenge
    className?: string
    testIds?: TestIds
}

const CompetitionRulesDescription: React.FC<Props> = ({
    challenge,
    className,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <div
            className={className}
            data-testid={testIds?.root ?? 'challenge-rules-description'}
        >
            <p>
                <b>{t('rules.description.header')}</b>
            </p>
            <ul>
                <li>
                    {t('rules.description.list.maxDailyDrawdown', {
                        count: getPercentage(
                            challenge.todayPermittedLoss,
                            challenge.account.amount
                        ),
                    })}
                </li>
                <li>
                    {t('rules.description.list.maxTotalDrawdown', {
                        count: getPercentage(
                            challenge.maxPermittedLimit,
                            challenge.account.amount
                        ),
                    })}
                </li>

                <li>
                    {t('rules.description.list.minTradingDays', {
                        count: challenge.minimumTradingDays,
                    })}
                </li>

                <li>{t('rules.description.list.noTakingAdvantage')}</li>
            </ul>
            <p>
                {t('rules.description.timingMessage', {
                    startDateTime: moment(challenge.startDate)
                        .locale(router.locale as string)
                        .format('lll Z'),
                    endDateTime: moment(challenge.endDate)
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
