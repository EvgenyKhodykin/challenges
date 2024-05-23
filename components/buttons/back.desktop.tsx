import IconButton from '@mui/material/IconButton'
import classNames from 'classnames'
import Link from 'next/link'

import ArrowLeftIcon from '../icons/arrow-left'
import styles from './back.desktop.module.scss'

export type TestId = string

export interface Props {
    className?: string
    testId?: TestId
    link: string
}

const Back: React.FC<Props> = ({ className, testId, link }: Props): JSX.Element => (
    <Link href={link}>
        <IconButton
            className={classNames(styles.Root, className)}
            data-testid={testId ?? 'buttons-back-desktop'}
        >
            <ArrowLeftIcon className={styles.Icon} />
        </IconButton>
    </Link>
)

Back.displayName = 'Buttons:Back.desktop'

export default Back
