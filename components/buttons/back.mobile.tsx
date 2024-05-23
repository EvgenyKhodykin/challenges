import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'
import Router from 'next/router'

import ArrowLeftIcon from '../icons/arrow-left'
import styles from './back.mobile.module.scss'

export type TestId = string

export interface Props {
    className?: string
    testId?: TestId
}

const Back: React.FC<Props> = ({ className, testId }: Props): JSX.Element => (
    <IconButton
        onClick={Router.back}
        className={classNames(styles.Root, className)}
        data-testid={testId ?? 'buttons-back-mobile'}
    >
        <ArrowLeftIcon className={styles.Icon} />
    </IconButton>
)

Back.displayName = 'Buttons:Back.mobile'

export default Back
