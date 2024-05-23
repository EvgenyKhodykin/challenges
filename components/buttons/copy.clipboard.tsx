import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import CopyIcon from '../icons/copy'
import variant from './copy.clipboard.module.scss'
import type Props from './copy-props.interface'
import type { ClipboardTestIds as TestIds } from './copy-test-ids.interface'
import master from './inline.module.scss'

const Copy: React.FC<Props> = ({
    handleCopy,
    copied,
    className,
    testIds,
}: Props): JSX.Element => {
    const { t } = useTranslation('affiliates')

    return (
        <div
            className={classNames(master.Root, className)}
            data-testid={(testIds as TestIds)?.root ?? 'buttons-copy-clipboard-root'}
        >
            <IconButton
                className={master.Button}
                onClick={handleCopy}
                data-testid={
                    (testIds as TestIds)?.button ?? 'buttons-copy-clipboard-button'
                }
            >
                <CopyIcon className={variant.Icon} />
            </IconButton>
            <span
                className={master.Text}
                data-testid={(testIds as TestIds)?.text ?? 'buttons-copy-clipboard-text'}
            >
                {copied
                    ? t('common:buttonCopyLabel.copied')
                    : t('common:buttonCopyLabel.copy')}
            </span>
        </div>
    )
}

Copy.displayName = 'Buttons:Copy.clipboard'

export default Copy
