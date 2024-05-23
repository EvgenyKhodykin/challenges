import CheckIcon from '@mui/icons-material/Check'
import classNames from 'classnames'
import registerFront from 'lib/challenges/register.front'
import CompetitionsContext from 'lib/pages/competitions-list/context'
import useTranslation from 'next-translate/useTranslation'
import { useContext, useMemo, useState } from 'react'

import { COMPETITION_STATUS } from '../../../lib/competitions/competitions.const'
import OutlinedButton from '../../buttons/outlined.link'
import PrimaryButton from '../../buttons/primary'
import IconArrowRight from '../../icons/arrow-right'
import IconStandings from '../../icons/standings'
import styles from './button.module.scss'
import type Props from './button-props.interface'

const Button: React.FC<Props> = ({
    className,
    testIds,
    status,
    participant,
    id,
    isDetailsPage = false,
    isRegistrationClosed = false,
}: Props): JSX.Element => {
    const context = useContext(CompetitionsContext)
    const { t } = useTranslation('competitions-list')
    const [isProcessing, setProcessing] = useState<boolean>(false)
    const [isRegistered, setRegistered] = useState<boolean>(
        !(status !== COMPETITION_STATUS.CLOSED && !participant)
    )

    const hideButton = useMemo(
        (): boolean => !isRegistered && isRegistrationClosed && isDetailsPage,
        [isRegistered, isRegistrationClosed, isDetailsPage]
    )

    const showStandingsButton = useMemo(
        (): boolean =>
            (isRegistered && !isDetailsPage) ||
            (!isRegistered && !isDetailsPage && isRegistrationClosed),
        [isDetailsPage, isRegistered, isRegistrationClosed]
    )

    const showRegisterButton = useMemo(
        (): boolean => !isRegistered && !isRegistrationClosed,
        [isRegistered, isRegistrationClosed]
    )

    const showRegisteredMessage = useMemo(
        (): boolean => isRegistered && isDetailsPage,
        [isRegistered, isDetailsPage]
    )

    const handleRegisterClick = async () => {
        setProcessing(true)

        const data = await registerFront(id)

        switch (data?.status) {
            case 'success':
                {
                    setProcessing(false)
                    setRegistered(true)
                    context.handleShowSuccess()
                }
                break
            case 'duplicate':
                {
                    setProcessing(false)
                    setRegistered(true)
                    context.handleShowError(data.code as number)
                }
                break
            case 'error':
                {
                    setProcessing(false)
                    setRegistered(false)
                    context.handleShowError(data.code || 0)
                }
                break
            default:
                return
        }
    }

    if (hideButton) {
        return <></>
    }

    return (
        <div
            className={classNames(styles.Root, className)}
            data-testid={testIds?.root ?? 'cards-competition-button'}
        >
            {showRegisterButton && (
                <PrimaryButton
                    variant='async'
                    className={styles.ButtonRegister}
                    onClick={handleRegisterClick}
                    processing={isProcessing}
                >
                    <span className={styles.ButtonRegisterLabel}>
                        {t('buttonRegister')}
                    </span>
                    <IconArrowRight className={styles.ButtonRegisterIcon} />
                </PrimaryButton>
            )}
            {showRegisteredMessage && (
                <div className={styles.Registered}>
                    <CheckIcon className={styles.CheckMark} />
                    <span>{t('registeredLabel')}</span>
                </div>
            )}
            {showStandingsButton && (
                <OutlinedButton
                    href={`/competitions/${id}`}
                    className={styles.ButtonStandings}
                >
                    <IconStandings className={styles.ButtonStandingsIcon} />
                    <span className={styles.ButtonStandingsLabel}>
                        {t('buttonStandings').toLocaleUpperCase()}
                    </span>
                </OutlinedButton>
            )}
        </div>
    )
}

Button.displayName = 'Cards:Competition.Button'

export default Button
