import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import CheckedListIcon from '../icons/checked-list'
import styles from './rules.details.module.scss'
import type Props from './rules-props.interface'

const Rules: React.FC<Props> = ({
    className,
    handleClick,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation()

    return (
        <button
            type='button'
            className={classNames(styles.Root, className)}
            onClick={handleClick}
            data-testid={testIds?.button ?? 'buttons-rules-details-root'}
        >
            <CheckedListIcon className={styles.Key} />
            <span
                className={styles.Text}
                data-testid={testIds?.text ?? 'buttons-rules-details-text'}
            >
                {t('rules.title')}
            </span>
            <ChevronRightIcon className={styles.Arrow} />
        </button>
    )
}

Rules.displayName = 'Buttons:Rules.details'

export default Rules
