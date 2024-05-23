import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './document.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const Document: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 12 16'}
        className={classNames(styles.Root, className)}
    >
        <path d='M2 8.5C2 8.36739 2.05268 8.24021 2.14645 8.14645C2.24021 8.05268 2.36739 8 2.5 8C2.63261 8 2.75979 8.05268 2.85355 8.14645C2.94732 8.24021 3 8.36739 3 8.5C3 8.63261 2.94732 8.75979 2.85355 8.85355C2.75979 8.94732 2.63261 9 2.5 9C2.36739 9 2.24021 8.94732 2.14645 8.85355C2.05268 8.75979 2 8.63261 2 8.5ZM2.5 10C2.36739 10 2.24021 10.0527 2.14645 10.1464C2.05268 10.2402 2 10.3674 2 10.5C2 10.6326 2.05268 10.7598 2.14645 10.8536C2.24021 10.9473 2.36739 11 2.5 11C2.63261 11 2.75979 10.9473 2.85355 10.8536C2.94732 10.7598 3 10.6326 3 10.5C3 10.3674 2.94732 10.2402 2.85355 10.1464C2.75979 10.0527 2.63261 10 2.5 10ZM2 12.5C2 12.3674 2.05268 12.2402 2.14645 12.1464C2.24021 12.0527 2.36739 12 2.5 12C2.63261 12 2.75979 12.0527 2.85355 12.1464C2.94732 12.2402 3 12.3674 3 12.5C3 12.6326 2.94732 12.7598 2.85355 12.8536C2.75979 12.9473 2.63261 13 2.5 13C2.36739 13 2.24021 12.9473 2.14645 12.8536C2.05268 12.7598 2 12.6326 2 12.5ZM4.5 8C4.36739 8 4.24021 8.05268 4.14645 8.14645C4.05268 8.24021 4 8.36739 4 8.5C4 8.63261 4.05268 8.75979 4.14645 8.85355C4.24021 8.94732 4.36739 9 4.5 9H9.5C9.63261 9 9.75979 8.94732 9.85355 8.85355C9.94732 8.75979 10 8.63261 10 8.5C10 8.36739 9.94732 8.24021 9.85355 8.14645C9.75979 8.05268 9.63261 8 9.5 8H4.5ZM4 10.5C4 10.3674 4.05268 10.2402 4.14645 10.1464C4.24021 10.0527 4.36739 10 4.5 10H9.5C9.63261 10 9.75979 10.0527 9.85355 10.1464C9.94732 10.2402 10 10.3674 10 10.5C10 10.6326 9.94732 10.7598 9.85355 10.8536C9.75979 10.9473 9.63261 11 9.5 11H4.5C4.36739 11 4.24021 10.9473 4.14645 10.8536C4.05268 10.7598 4 10.6326 4 10.5ZM4.5 12C4.36739 12 4.24021 12.0527 4.14645 12.1464C4.05268 12.2402 4 12.3674 4 12.5C4 12.6326 4.05268 12.7598 4.14645 12.8536C4.24021 12.9473 4.36739 13 4.5 13H9.5C9.63261 13 9.75979 12.9473 9.85355 12.8536C9.94732 12.7598 10 12.6326 10 12.5C10 12.3674 9.94732 12.2402 9.85355 12.1464C9.75979 12.0527 9.63261 12 9.5 12H4.5ZM2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H10C10.5304 16 11.0391 15.7893 11.4142 15.4142C11.7893 15.0391 12 14.5304 12 14V5.414C11.9996 5.01631 11.8414 4.63503 11.56 4.354L7.646 0.439C7.3648 0.157982 6.98355 8.48813e-05 6.586 0H2ZM1 2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H6V4.5C6 4.89782 6.15804 5.27936 6.43934 5.56066C6.72064 5.84196 7.10218 6 7.5 6H11V14C11 14.2652 10.8946 14.5196 10.7071 14.7071C10.5196 14.8946 10.2652 15 10 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V2ZM10.793 5H7.5C7.36739 5 7.24021 4.94732 7.14645 4.85355C7.05268 4.75979 7 4.63261 7 4.5V1.207L10.793 5Z' />
    </SvgIcon>
)

Document.displayName = 'Icon:Document'

export default Document
