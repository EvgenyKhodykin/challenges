import State from 'lib/pages/challenge-details/state.interface'
import useTranslation from 'next-translate/useTranslation'

import ChallengeRulesFAQs from '../../components/modal/faqs.rules'
import CheckedLitIcon from '../icons/checked-list'
import Body from './body.general'
import ChallengeRulesDescription from './challenge-details.description.rules'
import styles from './challenge-details.rules.module.scss'
import Header from './header.general'
import ModalGeneral from './modal.general'

export interface Props {
    state: State
    handleHide: () => void
}

const ChallengeDetails: React.FC<Props> = ({ state, handleHide }: Props): JSX.Element => {
    const { t } = useTranslation()

    return (
        <ModalGeneral shown={state.isRulesShown} handleClose={handleHide}>
            <Header>
                <h4 className={styles.Header}>
                    <CheckedLitIcon className={styles.Icon} />
                    <span className={styles.Text}>{t('rules.title')}</span>
                </h4>
            </Header>
            <Body>
                <ChallengeRulesDescription challenge={state.challenge} />
                <ChallengeRulesFAQs className={styles.FAQs} url='' />
            </Body>
        </ModalGeneral>
    )
}

ChallengeDetails.displayName = 'Modals:ChallengeDetails.rules'

export default ChallengeDetails
