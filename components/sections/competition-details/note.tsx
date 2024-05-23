import IconWarning from '@mui/icons-material/WarningAmberRounded'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import Paper from '../../surfaces/paper'
import styles from './note.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => {
    const { t } = useTranslation()

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Left}>
                <IconWarning className={styles.Icon} />
            </div>
            <div className={styles.Right}>
                <p>{t('rules.description.list.noTakingAdvantage')}.</p>
                <p>{t('rules.description.info')}</p>
            </div>
        </Paper>
    )
}

Component.displayName = 'Sections:CompetitionDetails:note'

export default Component
