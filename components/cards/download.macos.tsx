import classNames from 'classnames'
import isNil from 'lodash/isNil'
import useTranslation from 'next-translate/useTranslation'

import OutlinedButton from '../buttons/outlined.general'
import AppleIcon from '../icons/apple'
import DownloadIcon from '../icons/download'
import styles from './download.module.scss'
import type Props from './download-props.interface'

const DownloadMacOS: React.FC<Props> = ({
    data,
    testIds,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('downloads')
    if (isNil(data)) {
        return <></>
    }

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'download-macos'}
        >
            <div className={styles.Header}>
                <div className={styles.IconContainer}>
                    <AppleIcon className={styles.Icon} />
                </div>
                <div className={styles.Title}>{data.title}</div>
            </div>
            <div className={styles.Description}>{data.description}</div>
            <div className={styles.Button}>
                <OutlinedButton onClick={() => window.open(data.url)}>
                    <DownloadIcon className={styles.ButtonIcon} />{' '}
                    {t('buttonDownloadLabel')}
                </OutlinedButton>
            </div>
        </div>
    )
}

DownloadMacOS.displayName = 'Cards:Download.macos'

export default DownloadMacOS
