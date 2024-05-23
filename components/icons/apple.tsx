import type { SvgIconProps } from '@mui/material'
import { SvgIcon } from '@mui/material'
import classNames from 'classnames'

import styles from './apple.module.scss'
import type IconProps from './icon-props.interface'

export type Props = Pick<IconProps, 'className'>

const Apple: React.FC<SvgIconProps & Props> = ({
    className,
    ...props
}: SvgIconProps & Props): JSX.Element => (
    <SvgIcon
        {...props}
        viewBox={'0 0 64 64'}
        className={classNames(styles.Root, className)}
    >
        <path d='M42.0214 4.73145C39.0678 4.93087 35.6219 6.80029 33.6037 9.24106C31.7724 11.453 30.2661 14.7343 30.8568 17.9165H31.0931C34.2387 17.9165 37.4581 16.0336 39.3386 13.621C41.1501 11.3246 42.5235 8.07022 42.0214 4.73145V4.73145Z' />
        <path d='M42.9712 17.9165C38.0091 17.9165 35.9121 20.2704 32.4564 20.2704C28.9133 20.2704 26.2107 17.9336 21.9108 17.9336C17.7019 17.9336 13.2137 20.4882 10.3635 24.84C6.36136 30.9768 7.04069 42.5346 13.5226 52.3809C15.8412 55.9057 18.9375 59.8586 22.9987 59.9014H23.0725C26.6021 59.9014 27.6506 57.6038 32.508 57.5769H32.5819C37.3667 57.5769 38.3266 59.888 41.8414 59.888H41.9152C45.9764 59.8451 49.2389 55.4652 51.5575 51.9539C53.2263 49.4287 53.8465 48.1613 55.1264 45.3045C45.75 41.7663 44.2437 28.5519 53.5167 23.4856C50.6862 19.9621 46.7087 17.9214 42.9588 17.9214L42.9712 17.9165Z' />
    </SvgIcon>
)

Apple.displayName = 'Icon:Apple'

export default Apple
