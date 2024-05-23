import classNames from 'classnames'

import styles from './slider.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => (
    <svg
        className={classNames(styles.Root, className)}
        viewBox='0 0 13 16'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M0 6.66864C0 6.27892 0.159215 5.90612 0.440746 5.63664L5.83551 0.472773C6.11172 0.208389 6.54713 0.208389 6.82334 0.472773L12.2181 5.63664C12.4996 5.90612 12.6589 6.27892 12.6589 6.66863L12.6589 13.1429C12.6589 14.7208 11.3797 16 9.80171 16L2.85715 16C1.27919 16 0 14.7208 0 13.1429L0 6.66864Z'
            fill='url(#slider-gradient)'
        />
        <path className={styles.Line} d='M6.27148 12.1906L6.27148 7.61914' />
        <defs>
            <linearGradient
                id='slider-gradient'
                x1='6.32943'
                y1='0'
                x2='6.32943'
                y2='15.2381'
                gradientUnits='userSpaceOnUse'
            >
                <stop className={styles.StopOne} />
                <stop className={styles.StopTwo} />
            </linearGradient>
        </defs>
    </svg>
)

Component.displayName = 'Interactivity:Slider'

export default Component
