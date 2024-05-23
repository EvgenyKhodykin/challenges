import type {
    CredentialsCardTestId,
    CredentialsDetailsTestIds,
} from './credentials-test-ids.interface'

export default interface CredentialsProps {
    testIds?: CredentialsCardTestId | CredentialsDetailsTestIds
    className?: string
    handleClick?: React.MouseEventHandler
}
