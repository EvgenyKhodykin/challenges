import { Table } from '@mui/material'
import type AffiliateCommission from 'lib/affiliates/affiliate-commission.interface'
import type AffiliatePayout from 'lib/affiliates/affiliate-payout.interface'
import type AffiliateReferral from 'lib/affiliates/affiliate-referral.interface'
import type Campaign from 'lib/affiliates/campaign.interface'
import type TableHeader from 'lib/utils/table.sorting-header.interface'
import { useMemo } from 'react'

import TableSkeleton from '../../skeletons/affiliates/main.table'
import Header from '../../tables/header.sorting'
import Commissions from './affiliates.commissions/body'
import Payouts from './affiliates.payouts/body'
import Referrals from './affiliates.referrals/body'

export interface Props {
    variant: 'referrals' | 'commissions' | 'payouts'
    headerData: Array<TableHeader>
    orderBy?: string
    order?: 'asc' | 'desc'
    handleSorting: (key: string) => void
    i18nNamespace: string
    className?: string
    bodyData: Array<AffiliateReferral | AffiliateCommission | AffiliatePayout>
    isLoading: boolean
    campaigns?: Array<Campaign>
}

const Component: React.FC<Props> = ({
    variant,
    headerData,
    orderBy,
    order,
    handleSorting,
    i18nNamespace,
    className,
    bodyData,
    isLoading,
    campaigns,
}: Props): JSX.Element => {
    const body = useMemo(() => {
        switch (variant) {
            case 'referrals': {
                return <Referrals data={bodyData as Array<AffiliateReferral>} />
            }
            case 'commissions': {
                return (
                    <Commissions
                        data={bodyData as Array<AffiliateCommission>}
                        campaigns={campaigns as Array<Campaign>}
                    />
                )
            }
            case 'payouts': {
                return <Payouts data={bodyData as Array<AffiliatePayout>} />
            }
            default:
                return <></>
        }
    }, [variant, bodyData, campaigns])

    if (isLoading) {
        return <TableSkeleton />
    }
    return (
        <Table>
            <Header
                data={headerData}
                orderBy={orderBy}
                order={order}
                i18nNamespace={i18nNamespace}
                className={className}
                handleSorting={handleSorting}
            />
            {body}
        </Table>
    )
}

Component.displayName = 'Tables:Affiliates:List'

export default Component
