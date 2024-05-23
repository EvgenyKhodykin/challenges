import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import Amount from '../amount/amount'
import Back from '../buttons/back.mobile'
import ButtonShareFacebook from '../buttons/share/share.facebook'
import ButtonShareTwitter from '../buttons/share/share.twitter'
import Country from '../country'
import IconPayout from '../icons/payout'
import styles from './details.leaderboard.module.scss'

export interface Props {
    className?: string
}

const Component: React.FC<Props> = ({ className }: Props): JSX.Element => {
    const { t } = useTranslation('leaderboard')
    const theme: Theme = useTheme<Theme>()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const isPayoutVisible = useMediaQuery(theme.breakpoints.up('lg'))

    const name = useMemo(() => <span className={styles.Name}>J. Thomson</span>, [])
    const country = useMemo(() => <Country className={styles.Country} />, [])
    const id = useMemo(() => <span>#123456</span>, [])
    const account = useMemo(
        () => (
            <Amount
                className={styles.Account}
                amount={25000}
                currency={'USD'}
                position={'append'}
                superscript
                kilo
            />
        ),
        []
    )
    const payouts = useMemo(
        () => (
            <div className={styles.Payouts}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconPayout className={styles.Chart} />
                    </span>
                    <span className={styles.Text}>{t('details.payouts')}</span>
                </div>
                <Amount
                    className={styles.Amount}
                    amount={5500}
                    currency={'USD'}
                    position={'append'}
                    superscript
                />
            </div>
        ),
        [t]
    )
    const social = useMemo(
        () => (
            <div className={styles.Social}>
                <span>{t('details.foolowMe')}</span>
                <ButtonShareFacebook
                    className={styles.Button}
                    data={{
                        url: '',
                        quote: '',
                        hashtag: '',
                    }}
                />
                <ButtonShareTwitter
                    className={styles.Button}
                    data={{
                        url: '',
                        title: '',
                        hashtags: [],
                    }}
                />
            </div>
        ),
        [t]
    )

    return (
        <div className={classNames(styles.Root, className)}>
            {!isDesktop && (
                <>
                    <div className={styles.Top}>
                        <Back className={styles.Back} />
                        <div className={styles.Info}>
                            {name}&nbsp;&middot;&nbsp;{country}
                        </div>
                    </div>
                    <div className={styles.Middle}>
                        <div className={styles.Info}>
                            {id}&nbsp;&middot;&nbsp;{account}
                        </div>
                    </div>
                    <div className={styles.Bottom}>{social}</div>
                </>
            )}
            {isDesktop && (
                <div className={styles.Wrapper}>
                    <div className={styles.Info}>
                        {name}
                        &nbsp;&middot;&nbsp;
                        {country}
                        &nbsp;&middot;&nbsp;
                        {id}
                        &nbsp;&middot;&nbsp;
                        {account}
                    </div>
                    {isPayoutVisible && payouts}
                    {social}
                </div>
            )}
        </div>
    )
}

Component.displayName = 'Headers:Details.leaderboard'

export default Component
