import type { DownloadMetaTraderTestIds } from './download-test-ids.interface'

export default interface DownloadProps {
    className?: string
    testIds?: DownloadMetaTraderTestIds // may be a number of different interfaces
}
