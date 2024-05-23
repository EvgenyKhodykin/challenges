import 'moment/min/locales'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import type AffiliateItem from '../../../../lib/affiliates/affiliate-referral.interface'
import { TRADING_HISTORY_HEAD } from '../../../../lib/challenges/challenges.const'
import styles from './body.module.scss'

export interface Props {
    data: Array<AffiliateItem>
}

const Component: React.FC<Props> = ({ data }: Props): JSX.Element => {
    const { t } = useTranslation('affiliates')
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
                        {t('table.noDataTableMessage')}
                    </TableCell>
                </TableRow>
            )}
            {!isEmpty(data) &&
                map(data, (row: AffiliateItem, index: number) => (
                    <TableRow key={index}>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.id}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.name}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {moment(row.createdAt)
                                .locale(router.locale as string)
                                .format('lll')}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.totalOrders}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.campaignName}
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

Component.displayName = 'Tables:TradingHistory:Body'

export default Component
