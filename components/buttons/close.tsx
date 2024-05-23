import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'

import styles from './close.module.scss'

export interface TestIds {
    button?: string
    icon?: string
}

export interface Props {
    onPress: React.EventHandler<React.SyntheticEvent>
    className?: string
    testIds?: TestIds
}

const Close: React.FC<Props> = ({ onPress, className, testIds }: Props): JSX.Element => (
    <IconButton
        onClick={onPress}
        className={classNames(className)}
        data-testid={testIds?.button ?? 'button-close'}
    >
        <CloseIcon className={styles.Icon} data-testid={testIds?.icon ?? 'icon-close'} />
    </IconButton>
)

Close.displayName = 'Buttons:Close'

export default Close
