import 'moment/min/locales'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Campaign from 'lib/affiliates/campaign.interface'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import type AffiliateCommission from '../../../../lib/affiliates/affiliate-commission.interface'
import { COMMISSIONS_TABLE_HEAD } from '../../../../lib/affiliates/affiliates.const'
import Amount from '../../../amount/amount'
import styles from './body.module.scss'

export interface Props {
    campaigns: Array<Campaign>
    data: Array<AffiliateCommission>
}

const Component: React.FC<Props> = ({ campaigns, data }: Props): JSX.Element => {
    const { t } = useTranslation('affiliates')
    const router = useRouter()

    const getCampaignName = (id: string): string =>
        campaigns?.filter((campaign) => campaign.id === id)[0].label

    return (
        <TableBody className={styles.Body}>
            {isEmpty(data) && (
                <TableRow>
                    <TableCell
                        className={styles.Empty}
                        colSpan={COMMISSIONS_TABLE_HEAD.length}
                        align='center'
                    >
                        {t('table.noDataTableMessage')}
                    </TableCell>
                </TableRow>
            )}
            {!isEmpty(data) &&
                map(data, (row: AffiliateCommission, index: number) => (
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
                                amount={row.commission}
                                currency={'USD'}
                                position={'append'}
                                superscript
                                zeroAmount={'0'}
                            />
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {getCampaignName(row.campaignId)}
                        </TableCell>
                        <TableCell className={styles.Cell} align='left' padding='none'>
                            {row.status}
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    )
}

Component.displayName = 'Tables:TradingHistory:Body'

export default Component
