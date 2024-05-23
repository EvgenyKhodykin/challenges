import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import IconRestart from '../../icons/restart'
import Button from '../primary.general'
import styles from './restart.module.scss'

export interface Props {
    onClick: React.MouseEventHandler
    className?: string
}

const Component: React.FC<Props> = ({ onClick, className }: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')

    return (
        <Button onClick={onClick} className={classNames(styles.Root, className)}>
            <IconRestart className={styles.Icon} />
            <span className={styles.Message}>{t('challengeTiles.buttonRestart')}</span>
        </Button>
    )
}

Component.displayName = 'Buttons:Dashboard:Restart'

export default Component
