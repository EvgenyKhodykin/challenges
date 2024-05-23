import classNames from 'classnames'
import isNil from 'lodash/isNil'
import useTranslation from 'next-translate/useTranslation'

import OutlinedButton from '../buttons/outlined.general'
import BrowserIcon from '../icons/browser'
import ExternalLinkIcon from '../icons/external-link'
import TradeLockerIcon from '../icons/tradeLocker'
import styles from './download.module.scss'
import type Props from './download-props.interface'

const DownloadWeb: React.FC<Props> = ({
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
            data-testid={testIds?.root ?? 'download-web'}
        >
            <div className={styles.Header}>
                <div className={styles.IconContainer}>
                    {data.type === 'tl' ? (
                        <TradeLockerIcon />
                    ) : (
                        <BrowserIcon className={styles.Icon} />
                    )}
                </div>
                <div className={styles.Title}>{data.title}</div>
            </div>
            <div className={styles.Description}>{data.description}</div>
            <div className={styles.Button}>
                <OutlinedButton onClick={() => window.open(data.url, '_blank')}>
                    {t('buttonOpenLabel')}{' '}
                    <ExternalLinkIcon className={styles.ButtonIcon} />
                </OutlinedButton>
            </div>
        </div>
    )
}

DownloadWeb.displayName = 'Cards:Download.web'

export default DownloadWeb
