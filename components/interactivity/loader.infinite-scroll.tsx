import classNames from 'classnames'

import IconReload from '../icons/reload'
import styles from './loader.infinite-scroll.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => (
    <div className={classNames(styles.Root, className)}>
        <IconReload className={styles.Icon} />
    </div>
)

Component.displayName = 'Interactivity:Loader.infinite-scroll'

export default Component
