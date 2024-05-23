import classNames from 'classnames'

import styles from './indicator.module.scss'

export type variant = 'blinking' | 'solid'

export type type = 'success' | 'error' | 'info'

export interface Props {
    className?: string
    testId?: string
    variant: variant
    type?: type
    children?: React.ReactNode | string
    displayVariant?: 'card' | 'preview'
}

const StatusIndicator: React.FC<Props> = ({
    className,
    testId,
    variant,
    type,
    children,
    displayVariant,
}: Props): JSX.Element => (
    <span
        className={classNames(
            styles.Root,
            {
                [styles.Blinking]: variant === 'blinking',
                [styles.Solid]: variant === 'solid',
                [styles.Preview]: displayVariant === 'preview',
            },
            {
                [styles.Success]: type === 'success',
                [styles.Error]: type === 'error',
                [styles.Info]: type === 'info',
            },
            className
        )}
        data-testid={testId ?? 'status-indicator'}
    >
        {children}
    </span>
)

StatusIndicator.displayName = 'Status:Indicator'

export default StatusIndicator
