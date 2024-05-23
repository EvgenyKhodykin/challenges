import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import { ACCOUNTS_STATUS } from 'lib/accounts/accounts.const'
import { DASHBOARD_LIST_VARIANTS } from 'lib/client/client.const'
import isNil from 'lodash/isNil'
import partial from 'lodash/partial'
import { useState } from 'react'

import { DASHBOARD_CARD_AMOUNT_DISPLAY } from '../../../lib/challenges/challenges.const'
import CredentialsModal from '../../modal/modal.credentials'
import Content from './content.list'
import challengeCardStyles from './dashboard.list.module.scss'
import Graph from './graph.list'
import componentStyles from './passed.list.module.scss'
import type Props from './props.interface'

const Challenge: React.FC<Props> = ({
    className,
    data,
    amountVariant = DASHBOARD_CARD_AMOUNT_DISPLAY.PROFIT,
}: Props): JSX.Element => {
    const [hovered, setHovered] = useState<boolean>(false)
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const [credentials, setCredentials] = useState<boolean>(false)

    if (isNil(data)) {
        return <></>
    }

    return (
        <div
            onMouseEnter={partial(setHovered, true)}
            onMouseLeave={partial(setHovered, false)}
            className={classNames(
                challengeCardStyles.Root,
                componentStyles.Root,
                className
            )}
        >
            <Content
                tags={data.tags}
                id={data.id}
                endDate={new Date(data.endDate)}
                account={data.account}
                balance={data.balance}
                upper={data.upper}
                lower={data.lower}
                amountVariant={amountVariant}
                onCredentials={partial(setCredentials, true)}
                hovered={hovered}
                status={ACCOUNTS_STATUS.PASSED}
            />
            {isDesktop && <Graph data={data} />}
            <CredentialsModal
                visible={credentials}
                handleClose={partial(setCredentials, false)}
                id={data.login}
                server={data.server}
                exchangePlatform={data.exchangePlatform}
                className={componentStyles.Modal}
                variant={DASHBOARD_LIST_VARIANTS.LIST}
            />
        </div>
    )
}

Challenge.displayName = 'Cards:Challenge.passed'

export default Challenge
