import DownloadIcon from '@mui/icons-material/FileDownloadOutlined'
import classNames from 'classnames'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import variant from './download.mt4.module.scss'
import Props from './download-link-props.interface'
import type { DownloadMetaTraderTestIds as TestIds } from './download-test-ids.interface'
import master from './inline.module.scss'

const Download: React.FC<Props> = ({ className, testIds, url }: Props): JSX.Element => {
    const { t } = useTranslation()

    return (
        <Link
            href={url}
            title={`${t('common:download')} MT4`}
            download
            className={classNames(master.Root, variant.Root, className)}
            data-testid={(testIds as TestIds)?.root ?? 'buttons-download-mt4-root'}
        >
            <DownloadIcon className={variant.Icon} />
            <span
                className={master.Text}
                data-testid={(testIds as TestIds)?.text ?? 'buttons-download-mt4-text'}
            >
                MT4
            </span>
        </Link>
    )
}

Download.displayName = 'Buttons:Download.mt4'

export default Download
