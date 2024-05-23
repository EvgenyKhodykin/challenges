import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import type Props from './icon-props.interface'
import styles from './newChallenge.module.scss'

const NewChallenge: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        className={classNames(styles.Root, className)}
        viewBox={'0 0 36 36'}
    >
        <circle
            cx='18'
            cy='18'
            r='17.3889'
            stroke='#252733'
            strokeOpacity='0.84'
            strokeWidth='1.22222'
            strokeDasharray='1.91 1.91'
        />
        <path
            d='M18 11.6206V24.3801'
            stroke='#252733'
            strokeOpacity='0.84'
            strokeWidth='1.62963'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M24.3809 18.0005L11.6214 18.0005'
            stroke='#252733'
            strokeOpacity='0.84'
            strokeWidth='1.62963'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </SvgIcon>
)

NewChallenge.displayName = 'Icon:NewChallenge'

export default NewChallenge
