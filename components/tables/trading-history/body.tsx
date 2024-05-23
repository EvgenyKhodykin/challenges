import 'moment/min/locales'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import classNames from 'classnames'
import Amount from 'components/amount/amount'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import {
    TRADE_OPERATION_TYPE,
    TRADING_HISTORY_HEAD,
} from '../../../lib/challenges/challenges.const'
import type TradesLogItem from '../../../lib/challenges/trades-log-item.interface'
import styles from './body.module.scss'

export interface Props {
    data: Array<TradesLogItem>
}

const Component: React.FC<Props> = ({ data }: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const router = useRouter()

    return (
        <TableBody className={styles.Body}>
            {isEmpty(data) && (
                <TableRow>
                    <TableCell
                        className={styles.Empty}
                        colSpan={TRADING_HISTORY_HEAD.length}
                        align='center'
                    >
                        {t('tradingHistory.journal.tableMessage')}
                    </TableCell>
                </TableRow>
            )}
            {!isEmpty(data) &&
                map(data, (row: TradesLogItem, index: number) => (
                    <TableRow key={index}>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.ticket}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {moment(row.openTime)
                                .locale(router.locale as string)
                                .format('ll')}
                        </TableCell>
                        <TableCell
                            className={classNames(styles.Cell, styles.Colored, {
                                [styles.Negative]: [
                                    TRADE_OPERATION_TYPE.SELL,
                                    TRADE_OPERATION_TYPE.SELL_LIMIT,
                                    TRADE_OPERATION_TYPE.SELL_STOP,
                                ].includes(row.type as TRADE_OPERATION_TYPE),
                            })}
                            align='left'
                            padding='none'
                        >
                            {row.type}
                        </TableCell>
                        <TableCell className={styles.Cell} align='right' padding='none'>
                            {row.volume}
                        </TableCell>
                        <TableCell className={styles.Cell} align='right' padding='none'>
                            {row.symbol}
                        </TableCell>
                        <TableCell className={styles.Cell} padding='none' align='right'>
                            {row.openPrice}
                        </TableCell>
                        <TableCell className={styles.Cell} padding='none' align='right'>
                            {row.sl}
                        </TableCell>
                        <TableCell className={styles.Cell} padding='none' align='right'>
                            {row.tp}
                        </TableCell>
                        <TableCell className={styles.Cell} padding='none' align='left'>
                            {moment(row.closeTime)
                                .locale(router.locale as string)
                                .format('ll')}
                        </TableCell>
                        <TableCell className={styles.Cell} padding='none' align='right'>
                            {row.closePrice}
                        </TableCell>
                        <TableCell
                            className={classNames(styles.Cell, styles.Colored, {
                                [styles.Negative]: row.profitSign < 0,
                            })}
                            padding='none'
                            align='right'
                        >
                            <Amount amount={Number(row.profit)} />
                        </TableCell>
                        <TableCell
                            className={classNames(styles.Cell, styles.Colored, {
                                [styles.Negative]: row.changeSign < 0,
                            })}
                            padding='none'
                            align='right'
                        >
                            {row.change}
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

Component.displayName = 'Tables:TradingHistory:Body'

export default Component
