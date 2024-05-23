import type Download from '../../lib/downloads/download.interface'
export default interface DownloadProps {
    data?: Download
    className?: string
    testIds?: {
        root?: string
        button?: string
    }
}
