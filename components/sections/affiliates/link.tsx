import classNames from 'classnames'
import Affiliate from 'lib/affiliates/affiliate.interface'
import Campaign from 'lib/affiliates/campaign.interface'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import copyToClipboard from '../../../lib/utils/copy-to-clipboard'
import ButtonCopy from '../../buttons/copy.clipboard'
import InputSelect from '../../inputs/select.general'
import InputText from '../../inputs/text.enter'
import Paper from '../../surfaces/paper'
import styles from './link.module.scss'

export interface Props {
    affiliate: Affiliate
    campaigns: Array<Campaign>
    className?: string
}

const Component: React.FC<Props> = ({
    affiliate,
    campaigns,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('affiliates')

    const description = useMemo((): string => {
        if (!affiliate.status) {
            return t('affiliateLink.description3')
        }
        if (campaigns.length === 1) {
            return t('affiliateLink.description2')
        }
        return t('affiliateLink.description1')
    }, [affiliate, campaigns, t])

    const defaultCampaign = useMemo(
        (): Campaign => campaigns.filter((item) => item.label === 'Default')[0],
        [campaigns]
    )

    const [hash, setHash] = useState<string>(defaultCampaign?.value)
    const [copied, setCopied] = useState<boolean>(false)

    const handleChangeCampaign = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHash(event.target.value)
        setCopied(false)
    }

    const linkValue = useMemo(
        () => `https://app-master.k8s-dev.redacreltd.com/signup/?referral=${hash}`,
        [hash]
    )

    const handleCopy = useCallback(async () => {
        const result = await copyToClipboard(linkValue)

        if (result) {
            setCopied(true)
        }
    }, [linkValue])

    useEffect(() => {
        setHash(defaultCampaign?.value)
    }, [defaultCampaign])

    return (
        <Paper className={classNames(styles.Root, className)}>
            <div className={styles.Top}>
                <span>{t('affiliateLink.title')}</span>
            </div>
            <div className={styles.Bottom}>
                <p>{description}</p>
                {defaultCampaign && hash && (
                    <div className={styles.Form}>
                        <div className={classNames(styles.FormGroup, styles.AffiliateID)}>
                            <InputText
                                label={t('affiliateLink.inputTextIdLabel')}
                                name='affiliateID'
                                value={affiliate.id}
                                onBlur={() => undefined}
                                onChange={() => undefined}
                                disabled
                            />
                        </div>
                        <div className={classNames(styles.FormGroup, styles.Campaign)}>
                            <InputSelect
                                label={t('affiliateLink.inputSelectLabel')}
                                name='campaign'
                                value={hash}
                                onChange={handleChangeCampaign}
                                items={campaigns}
                                defaultValue={defaultCampaign.value}
                            />
                        </div>
                        <div
                            className={classNames(styles.FormGroup, styles.Link, {
                                [styles.Copied]: copied,
                            })}
                        >
                            <InputText
                                label={t('affiliateLink.inputTextLinkLabel')}
                                name='link'
                                value={linkValue}
                                onBlur={() => undefined}
                                onChange={() => undefined}
                                readOnly
                            />
                            <ButtonCopy
                                className={styles.Button}
                                handleCopy={handleCopy}
                                copied={copied}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Paper>
    )
}

Component.displayName = 'Sections:Affiliates:Link'

export default Component
