import Button from '@mui/material/Button'
import classNames from 'classnames'
import type { FunctionComponent } from 'react'

import Progress from '../interactivity/progress.circular'
import styles from './primary.submit.module.scss'
import type PrimaryProps from './primary-props.interface'

export type Props = Omit<PrimaryProps, 'variant'>

const Primary: FunctionComponent<Props> = ({
    onClick,
    children,
    disabled,
    processing,
    className,
    testIds,
}: Props): JSX.Element => (
    <div className={classNames(styles.Button, className)}>
        {!processing && (
            <Button
                data-testid={testIds?.button ?? 'button-primary-submit'}
                type={'submit'}
                onClick={onClick}
                disabled={disabled}
                disableElevation
            >
                {children}
            </Button>
        )}
        {processing && (
            <Progress
                data-testid={testIds?.progress ?? 'button-primary-submit-progress'}
            />
        )}
    </div>
)

Primary.displayName = 'Buttons:Primary.submit'

export default Primary
