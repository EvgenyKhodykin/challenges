import useTranslation from 'next-translate/useTranslation'

import OutlinedButton from '../buttons/outlined.general'

export interface TestIds {
    root?: string
}

export interface Props {
    className?: string
    testIds?: TestIds
    url: string
}

const CompetitionRulesDescription: React.FC<Props> = ({
    className,
    testIds,
    url,
}: Props): JSX.Element => {
    const { t } = useTranslation()

    return (
        <div className={className} data-testid={testIds?.root ?? 'challenge-rules-faqs'}>
            <OutlinedButton onClick={() => window.open(url)}>
                {t('rules.description.buttonReadFAQs')}
            </OutlinedButton>
        </div>
    )
}

CompetitionRulesDescription.displayName = 'Modal:ChallengeDetails:RulesFAQs'

export default CompetitionRulesDescription
