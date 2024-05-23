import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './currency.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const Usa: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 25 24'}
        className={classNames(styles.Root, className)}
    >
        <path
            d='M12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24Z'
            fill='#F0F0F0'
        />
        <path
            d='M11.9785 12.0001H24.5002C24.5002 10.917 24.3559 9.86774 24.0868 8.86963H11.9785V12.0001Z'
            fill='#D80027'
        />
        <path
            d='M11.9785 5.73934H22.739C22.0044 4.54065 21.0651 3.48114 19.97 2.60889H11.9785V5.73934Z'
            fill='#D80027'
        />
        <path
            d='M12.5011 24.0003C15.3252 24.0003 17.921 23.0242 19.9709 21.3916H5.03125C7.08109 23.0242 9.67689 24.0003 12.5011 24.0003Z'
            fill='#D80027'
        />
        <path
            d='M2.26195 18.2608H22.7394C23.3291 17.2985 23.7865 16.2467 24.0873 15.1304H0.914062C1.21486 16.2467 1.67222 17.2985 2.26195 18.2608Z'
            fill='#D80027'
        />
        <path
            d='M6.05863 1.87397H7.15217L6.13498 2.61295L6.52353 3.80869L5.50639 3.0697L4.48925 3.80869L4.82487 2.7757C3.92928 3.52172 3.14431 4.39575 2.49744 5.36963H2.84783L2.20034 5.84002C2.09947 6.0083 2.00272 6.17925 1.91 6.35273L2.21919 7.30434L1.64234 6.88523C1.49895 7.18903 1.3678 7.49967 1.24991 7.81678L1.59055 8.86528H2.84783L1.83064 9.60427L2.21919 10.8L1.20205 10.061L0.592766 10.5037C0.531781 10.9939 0.5 11.4932 0.5 12H12.5C12.5 5.37262 12.5 4.59131 12.5 0C10.1294 0 7.91961 0.687656 6.05863 1.87397ZM6.52353 10.8L5.50639 10.061L4.48925 10.8L4.8778 9.60427L3.86061 8.86528H5.11789L5.50639 7.66955L5.89489 8.86528H7.15217L6.13498 9.60427L6.52353 10.8ZM6.13498 6.10861L6.52353 7.30434L5.50639 6.56536L4.48925 7.30434L4.8778 6.10861L3.86061 5.36963H5.11789L5.50639 4.17389L5.89489 5.36963H7.15217L6.13498 6.10861ZM10.8279 10.8L9.81073 10.061L8.79359 10.8L9.18214 9.60427L8.16495 8.86528H9.42223L9.81073 7.66955L10.1992 8.86528H11.4565L10.4393 9.60427L10.8279 10.8ZM10.4393 6.10861L10.8279 7.30434L9.81073 6.56536L8.79359 7.30434L9.18214 6.10861L8.16495 5.36963H9.42223L9.81073 4.17389L10.1992 5.36963H11.4565L10.4393 6.10861ZM10.4393 2.61295L10.8279 3.80869L9.81073 3.0697L8.79359 3.80869L9.18214 2.61295L8.16495 1.87397H9.42223L9.81073 0.678234L10.1992 1.87397H11.4565L10.4393 2.61295Z'
            fill='#0052B4'
        />
    </SvgIcon>
)

Usa.displayName = 'Icon:Usa'

export default Usa
