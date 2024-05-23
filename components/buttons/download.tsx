import DownloadMT4 from './download.mt4'
import DownloadMT5 from './download.mt5'
import DownloadTL from './download.tl'
import type DownloadProps from './download-props.interface'

export type Variant = 'mt4' | 'mt5' | 'tl'

export interface Props extends DownloadProps {
    variant: Variant
}

const Download: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    const url = '/downloads'

    switch (variant) {
        case 'mt4':
            return <DownloadMT4 {...props} url={url} />
        case 'mt5':
            return <DownloadMT5 {...props} url={url} />
        case 'tl':
            return <DownloadTL {...props} url={url} />
        default:
            return <></>
    }
}

Download.displayName = 'Buttons:Download'

export default Download
