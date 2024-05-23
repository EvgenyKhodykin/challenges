import classNames from 'classnames'
import { ACCOUNTS_STATUS } from 'lib/accounts/accounts.const'
import isNil from 'lodash/isNil'
import partial from 'lodash/partial'
import Link from 'next/link'
import { useState } from 'react'

import { DASHBOARD_CARD_AMOUNT_DISPLAY } from '../../../lib/challenges/challenges.const'
import ModalFailed from '../../modal/dashboard/failed'
import CredentialsModal from '../../modal/modal.credentials'
import Body from './body.tile'
import master from './dashboard.module.scss'
import variant from './failed.tile.module.scss'
import Footer from './footer'
import Header from './header'
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
    const [fails, setFails] = useState<boolean>(false)

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
                        status={ACCOUNTS_STATUS.FAILED}
                        endDate={new Date(data.endDate)}
                        login={data.login}
                        displayVariant='preview'
                    />
                    <Body
                        data={data}
                        amountVariant={amountVariant}
                        onFails={partial(setFails, true)}
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
            })}
        >
            <Header status={ACCOUNTS_STATUS.FAILED} endDate={new Date(data.endDate)} />
            <Body
                data={data}
                amountVariant={amountVariant}
                onFails={partial(setFails, true)}
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
            <ModalFailed visible={fails} data={data} onClose={partial(setFails, false)} />
        </div>
    )
}

Challenge.displayName = 'Cards:Challenge.failed'

export default Challenge
