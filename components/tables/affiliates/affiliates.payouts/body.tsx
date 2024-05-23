import 'moment/min/locales'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import type AffiliatePayoutItem from '../../../../lib/affiliates/affiliate-payout.interface'
import { PAYOUT_TABLE_HEAD } from '../../../../lib/affiliates/affiliates.const'
import Amount from '../../../amount/amount'
import styles from './body.module.scss'

export interface Props {
    data: Array<AffiliatePayoutItem>
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
                        colSpan={PAYOUT_TABLE_HEAD.length}
                        align='center'
                    >
                        {t('table.noDataTableMessage')}
                    </TableCell>
                </TableRow>
            )}
            {!isEmpty(data) &&
                map(data, (row: AffiliatePayoutItem, index: number) => (
                    <TableRow key={index}>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.id}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {moment(row.createdAt)
                                .locale(router.locale as string)
                                .format('lll')}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            <Amount
                                amount={row.amount}
                                currency={'USD'}
                                position={'append'}
                                superscript
                            />
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.status}
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

Component.displayName = 'Tables:Affiliates.payout:Body'

export default Component
