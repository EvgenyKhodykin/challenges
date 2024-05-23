import moment from 'moment'
import type { FunctionComponent } from 'react'
import { Fragment } from 'react'

import styles from './footer.general.module.scss'

export interface Props {
    children?: React.ReactNode
}

const Footer: FunctionComponent<Props> = ({ children }: Props): JSX.Element => {
    const copy = ` Company ${moment().format('yyyy')}`
    return (
        <div className={styles.Footer} data-desktop={copy}>
            <p className={styles.Copy}>&copy;{copy}</p>
            {children}
        </div>
    )
}

const defaultProps: Props = {
    children: <Fragment />,
}

Footer.displayName = 'Footer.general'

Footer.defaultProps = defaultProps

export default Footer
