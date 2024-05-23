import CheckIcon from '@mui/icons-material/Check'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined'
import classNames from 'classnames'
import map from 'lodash/map'
import type { FunctionComponent } from 'react'

import type PublicFormsStep from '../../lib/navigation/public-forms-step.interface'
import styles from './steps.public.module.scss'
import type StepsProps from './steps-props.interface'

export type Props = Omit<StepsProps<PublicFormsStep>, 'variant'>

const Steps: FunctionComponent<Props> = ({ items, className }: Props): JSX.Element => (
    <ul
        data-testid='navigation-steps-public'
        className={classNames(styles.Wrapper, className)}
    >
        {map(items, ({ text, state }: PublicFormsStep, index: number) => (
            <li className={styles.Item} key={index}>
                <span
                    className={classNames(styles.Text, {
                        [styles.TextPrevious]: state === 'previous',
                        [styles.TextCurrent]: state === 'current',
                    })}
                >
                    {text}
                </span>
                <span className={styles.Icon}>
                    {state === 'current' && (
                        <FiberManualRecordIcon className={styles.Current} />
                    )}
                    {state === 'previous' && <CheckIcon className={styles.Previous} />}
                    {state === 'next' && (
                        <FiberManualRecordOutlinedIcon className={styles.Next} />
                    )}
                </span>
            </li>
        ))}
    </ul>
)

Steps.displayName = 'Navigation:Steps.public'

export default Steps
