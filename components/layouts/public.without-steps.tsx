import isNil from 'lodash/isNil'
import type { FunctionComponent } from 'react'
import React, { Fragment } from 'react'

import styles from './public.without-steps.module.scss'
import type PublicProps from './public-props.interface'

export type Props = Omit<PublicProps, 'variant'>

const Public: FunctionComponent<Props> = ({
    heading,
    logo,
    bottom,
    children,
}: Props): JSX.Element => (
    <div className={styles.Wrapper}>
        <div className={styles.Container}>
            <div className={styles.Heading}>{heading}</div>
            <div className={styles.Content}>
                {!isNil(logo) && <div className={styles.Logo}>{logo}</div>}
                <div className={styles.Form}>{children}</div>
                {!isNil(bottom) && <div className={styles.Bottom}>{bottom}</div>}
            </div>
        </div>
    </div>
)

const defaultProps: Props = {
    heading: <Fragment />,
    children: <Fragment />,
}

Public.displayName = 'Layout:Public.without-steps'

Public.defaultProps = defaultProps

export default Public
