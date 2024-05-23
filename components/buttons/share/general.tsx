import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'

import IconShare from '../../icons/social.share'
import styles from './general.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => (
    <IconButton className={classNames(styles.Root, className)}>
        <IconShare />
    </IconButton>
)

Component.displayName = 'Buttons:Share.general'

export default Component
