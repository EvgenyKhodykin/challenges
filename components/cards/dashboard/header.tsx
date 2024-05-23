import 'moment/min/locales'

import classNames from 'classnames'
import { ACCOUNTS_STATUS } from 'lib/accounts/accounts.const'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import type { Variant as StatusVariant } from '../../statuses/challenge'
import Status from '../../statuses/challenge'
import componentStyles from './header.module.scss'

export interface TestIds {
    root?: string
    status?: string
    date?: string
}

export interface Props {
    status: ACCOUNTS_STATUS
    endDate: Date
    login?: string
    className?: string
    testIds?: TestIds
    displayVariant?: 'card' | 'preview'
}

const Header: React.FC<Props> = ({
    className,
    status,
    endDate,
    login,
    testIds,
    displayVariant,
}: Props): JSX.Element => {
    const { t } = useTranslation('common')
    const router = useRouter()

    const id = useMemo(() => {
        const ends = moment(new Date(endDate))
            .locale(router.locale as string)
            .format('ll')
        return (
            <p className={componentStyles.Id}>
                {`#${login}`}&nbsp;&#183;&nbsp;{ends}
            </p>
        )
    }, [router, endDate, login])

    const displayedEndDate = useMemo(() => {
        if (displayVariant !== 'preview') {
            if (moment().isAfter(endDate)) {
                return `${t('endedOn')}: ${moment(endDate)
                    .locale(router.locale as string)
                    .format('ll')}`
            } else if (moment().isBefore(endDate)) {
                return `${t('endsIn')}: ${moment(endDate)
                    .locale(router.locale as string)
                    .format('ll')}`
            }
        }
    }, [displayVariant, endDate, router, t])

    return (
        <div
            className={classNames(componentStyles.Root, className, {
                [componentStyles.Preview]: displayVariant === 'preview',
            })}
            data-testid={testIds?.root ?? 'cards-header-challenge-root'}
        >
            <Status
                status={status as StatusVariant}
                testId={testIds?.status}
                displayVariant={displayVariant}
            />
            <span
                className={componentStyles.Date}
                data-testid={testIds?.date ?? 'cards-header-challenge-date'}
            >
                {displayedEndDate}
                {displayVariant === 'preview' && id}
            </span>
        </div>
    )
}

Header.displayName = 'Cards:Header.challenges'

export default Header
