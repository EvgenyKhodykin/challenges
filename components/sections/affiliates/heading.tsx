import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import useTranslation from 'next-translate/useTranslation'

import type Price from '../../../lib/utils/price.interface'
import Amount from '../../amount/amount'
import styles from './heading.module.scss'

export interface Props {
    data?: Price
    className?: string
}

const Component: React.FC<Props> = ({ data, className }: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))
    const { t } = useTranslation('affiliates')

    const hasData = isDesktop && !isNil(data) && data.amount > 0

    return (
        <div className={classNames(styles.Root, className)}>
            <h1>{t('title')}</h1>
            {hasData && (
                <p>
                    {t('pendingPayout')}{' '}
                    <Amount
                        className={styles.Amount}
                        amount={data.amount}
                        currency={data.currency}
                        position={'append'}
                        superscript
                    />
                </p>
            )}
        </div>
    )
}

Component.displayName = 'Sections:Affiliates:Heading'

export default Component
