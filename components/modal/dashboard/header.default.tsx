import classNames from 'classnames'

import CloseButton from '../../buttons/close'
import styles from './header.default.module.scss'

export interface Props {
    onClose: React.MouseEventHandler
    className?: string
}

const Component: React.FC<Props> = ({ onClose, className }: Props): JSX.Element => (
    <div className={classNames(styles.Root, className)}>
        <CloseButton onPress={onClose} className={styles.Button} />
    </div>
)

Component.displayName = 'Modals:Dashboard:Header.default'

export default Component
