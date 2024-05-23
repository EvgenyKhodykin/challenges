import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import Button from '../buttons/primary'
import styles from './footer.credentials.module.scss'

export interface TestIds {
    root?: string
    text?: string
    button?: string
}

export interface Props {
    handleResetPassword: React.MouseEventHandler
    text?: string
    className?: string
    testIds?: TestIds
}

const Footer: React.FC<Props> = ({
    handleResetPassword,
    text,
    className,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'modals-footer-credentials-root'}
        >
            <p
                className={styles.HelperText}
                data-testid={testIds?.text ?? 'modals-footer-credentials-text'}
            >
                {text ?? t('challengeTiles.credentials.message')}
            </p>
            <Button
                onClick={handleResetPassword}
                variant='general'
                data-testid={testIds?.button ?? 'modals-footer-credentials-button'}
            >
                {t('challengeTiles.credentials.resetPassword')}
            </Button>
        </div>
    )
}

Footer.displayName = 'Modals:Footer.credentials'

export default Footer
