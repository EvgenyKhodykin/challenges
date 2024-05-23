/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import Amount from '../../amount/amount'
import IconPayout from '../../icons/payout'
import Paper from '../../surfaces/paper'
import styles from './payouts.module.scss'

export interface Props {
    value: number
    className?: string
}

const Component: React.FC<Props> = ({ value, className }: Props): JSX.Element => {
    const { t } = useTranslation('affiliates')

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <div className={styles.Title}>
                    <span className={styles.Icon}>
                        <IconPayout className={styles.Chart} />
                    </span>
                    <span className={styles.Text}>{t('board.payouts.title')}</span>
                </div>
            </div>
            <div className={styles.Middle}>
                <Amount
                    className={styles.Amount}
                    amount={value}
                    currency={'USD'}
                    position={'append'}
                    superscript
                    zeroAmount='&mdash;'
                />
            </div>
        </Paper>
    )
}

Component.displayName = 'Sections:Affiliates:Payouts'

export default Component
