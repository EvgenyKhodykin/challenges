import classNames from 'classnames'
import { ACCOUNTS_STATUS } from 'lib/accounts/accounts.const'
import isNil from 'lodash/isNil'
import partial from 'lodash/partial'
import Link from 'next/link'
import { useState } from 'react'

import { DASHBOARD_CARD_AMOUNT_DISPLAY } from '../../../lib/challenges/challenges.const'
import ModalRules from '../../modal/dashboard/rules'
import CredentialsModal from '../../modal/modal.credentials'
import Body from './body.tile'
import master from './dashboard.module.scss'
import Footer from './footer'
import Header from './header'
import variant from './ongoing.tile.module.scss'
import type Props from './props.interface'

const Challenge: React.FC<Props> = ({
    className,
    data,
    amountVariant = DASHBOARD_CARD_AMOUNT_DISPLAY.PROFIT,
    displayVariant,
    onPress,
}: Props): JSX.Element => {
    const [hovered, setHovered] = useState<boolean>(false)
    const [credentials, setCredentials] = useState<boolean>(false)
    const [rules, setRules] = useState<boolean>(false)

    if (isNil(data)) {
        return <></>
    }

    if (displayVariant === 'preview') {
        return (
            <Link
                href={`/challenges/${data.id}`}
                style={{ textDecoration: 'none' }}
                onClick={onPress}
            >
                <div
                    className={classNames(
                        master.Root,
                        master.Preview,
                        variant.Root,
                        className
                    )}
                >
                    <Header
                        status={ACCOUNTS_STATUS.ONGOING}
                        endDate={new Date(data.endDate)}
                        login={data.login}
                        displayVariant='preview'
                    />
                    <Body
                        data={data}
                        amountVariant={amountVariant}
                        onRules={partial(setRules, true)}
                        displayVariant='preview'
                    />
                    <Footer
                        data={data}
                        onCredentials={partial(setCredentials, true)}
                        hovered={hovered}
                        displayVariant='preview'
                    />
                </div>
            </Link>
        )
    }

    return (
        <div
            onMouseEnter={partial(setHovered, true)}
            onMouseLeave={partial(setHovered, false)}
            className={classNames(master.Root, variant.Root, className, {
                [master.CardModalOpened]: credentials,
                [variant.RecentlyCreated]: data.isRecentlyCreated,
            })}
        >
            <Header status={ACCOUNTS_STATUS.ONGOING} endDate={new Date(data.endDate)} />
            <Body
                data={data}
                amountVariant={amountVariant}
                onRules={partial(setRules, true)}
            />
            <Footer
                data={data}
                onCredentials={partial(setCredentials, true)}
                hovered={hovered}
            />
            <CredentialsModal
                visible={credentials}
                handleClose={partial(setCredentials, false)}
                id={data.login}
                server={data.server}
                exchangePlatform={data.exchangePlatform}
            />
            <ModalRules visible={rules} onClose={partial(setRules, false)} data={data} />
        </div>
    )
}

Challenge.displayName = 'Cards:Challenge.failed'

export default Challenge
