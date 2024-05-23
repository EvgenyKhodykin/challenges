import useTranslation from 'next-translate/useTranslation'

import InputText from '../../inputs/text.search'
import styles from './actions.module.scss'

export interface Props {
    onChange: React.ChangeEventHandler
    value?: string
    id?: string
}

const Component: React.FC<Props> = ({ onChange }: Props): JSX.Element => {
    const { t } = useTranslation('competitions-details')

    return (
        <div className={styles.Root}>
            <InputText
                name='search'
                label={t('standings.rightBoard.inputLabel')}
                onChange={onChange}
                className={styles.Input}
                onBlur={() => null}
            />
        </div>
    )
}

Component.displayName = 'Tables:CompetitionDetails:Actions'

export default Component
