import Affiliate from 'lib/affiliates/affiliate.interface'
import Campaign from 'lib/affiliates/campaign.interface'
import { AffiliatesBTCPayoutConfigs } from 'lib/forms/initial-values.interface'

import Payout from '../../forms/btc-payout'
import Link from '../../sections/affiliates/link'
import Skeleton from '../../skeletons/affiliates/link'

export interface Props {
    variant: 'link' | 'payout'
    isLoading?: boolean
    affiliate?: Affiliate
    campaigns?: Array<Campaign>
    i18nNamespace?: string
    initialValues?: AffiliatesBTCPayoutConfigs
    className?: string
}

const Component: React.FC<Props> = ({
    variant,
    isLoading,
    affiliate,
    campaigns,
    className,
    i18nNamespace,
    initialValues,
}: Props): JSX.Element => {
    if (isLoading) {
        return <Skeleton />
    }

    switch (variant) {
        case 'link': {
            return (
                <Link
                    affiliate={affiliate as Affiliate}
                    campaigns={campaigns as Array<Campaign>}
                    className={className}
                />
            )
        }
        case 'payout': {
            return (
                <Payout
                    initialValues={initialValues as AffiliatesBTCPayoutConfigs}
                    className={className}
                    i18nNamespace={i18nNamespace as string}
                />
            )
        }
    }
}

export default Component
