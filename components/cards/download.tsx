import DownloadAndroid from './download.android'
import DownloadIOS from './download.ios'
import DownloadMacOS from './download.macos'
import DownloadWeb from './download.web'
import DownloadWindows from './download.windows'
import type DownloadProps from './download-props.interface'

export type Variant = 'web' | 'windows' | 'macos' | 'ios' | 'android'

export interface Props extends DownloadProps {
    variant: Variant
}

const Download: React.FC<Props> = ({ variant, ...props }: Props): JSX.Element => {
    switch (variant) {
        case 'web':
            return <DownloadWeb {...props} />
        case 'macos':
            return <DownloadMacOS {...props} />
        case 'windows':
            return <DownloadWindows {...props} />
        case 'ios':
            return <DownloadIOS {...props} />
        case 'android':
            return <DownloadAndroid {...props} />
        default:
            return <></>
    }
}

Download.displayName = 'Cards:Download'

export default Download
