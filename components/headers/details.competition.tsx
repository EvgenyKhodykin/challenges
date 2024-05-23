import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import moment from 'moment'

import type Competition from '../../lib/competitions/competition.interface'
import Back from '../buttons/back.desktop'
import Rules from '../buttons/rules'
import Button from '../cards/competition/button'
import Status from '../statuses/competition'
import styles from './details.competition.module.scss'

export type Data = Pick<Competition, 'status' | 'title'>

export interface Props {
    handleRules: React.MouseEventHandler
    competition: Competition
    className?: string
}

const Component: React.FC<Props> = ({
    className,
    competition,
    handleRules,
}: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const isRegistrationClosed = moment().isAfter(competition.registrationDeadline)

    return (
        <div className={classNames(styles.Root, className)}>
            {!isDesktop && competition.id && (
                <>
                    <div className={styles.Top}>
                        <Back className={styles.Back} link='/competitions' />
                        <div className={styles.Info}>
                            <Status
                                variant={competition.status}
                                className={styles.Status}
                            />
                            &nbsp;&middot;&nbsp;
                            <span className={styles.Id}>{competition.title}</span>
                        </div>
                    </div>
                    <div className={styles.Bottom}>
                        <Rules
                            variant='details'
                            handleClick={handleRules as React.MouseEventHandler}
                            className={styles.Rules}
                        />
                        <Button
                            status={competition.status}
                            id={competition.id}
                            participant={competition.participant}
                            className={styles.RegisterButton}
                            isDetailsPage
                            isRegistrationClosed={isRegistrationClosed}
                        />
                    </div>
                </>
            )}
            {isDesktop && competition.id > 0 && (
                <>
                    <div className={styles.Info}>
                        <Status variant={competition.status} className={styles.Status} />
                        &nbsp;&middot;&nbsp;
                        <span className={styles.Id}>{competition.title}</span>
                    </div>
                    <div className={styles.Links}>
                        <Rules
                            variant='details'
                            handleClick={handleRules as React.MouseEventHandler}
                            className={styles.Rules}
                        />
                        <Button
                            status={competition.status}
                            id={competition.id}
                            participant={competition.participant}
                            className={styles.RegisterButton}
                            key={competition.id}
                            isDetailsPage
                            isRegistrationClosed={isRegistrationClosed}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

Component.displayName = 'Headers:Details.competition'

export default Component
