import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import type { TestIds as CloseButtonTestIds } from '../buttons/close'
import CloseButton from '../buttons/close'
import KeyIcon from '../icons/key'
import styles from './header.credentials.module.scss'

export interface TestIds {
    root?: string
    title?: string
    close?: CloseButtonTestIds
}

export interface Props {
    handleClose: React.MouseEventHandler
    className?: string
    title?: string
    testIds?: TestIds
}

const Header: React.FC<Props> = ({
    handleClose,
    className,
    title,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'modals-header-credentials-root'}
        >
            <span className={styles.TitleHolder}>
                <KeyIcon className={styles.KeyIcon} />
                <span
                    className={styles.Title}
                    data-testid={testIds?.title ?? 'modals-header-credentials-title'}
                >
                    {title ?? t('challengeTiles.credentials.title')}
                </span>
            </span>
            <CloseButton
                onPress={handleClose}
                className={styles.CloseButton}
                testIds={testIds?.close}
            />
        </div>
    )
}

Header.displayName = 'Modals:Header.credentials'

export default Header
