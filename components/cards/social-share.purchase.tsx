import classNames from 'classnames'
import isNil from 'lodash/isNil'
import useTranslation from 'next-translate/useTranslation'

import Client from '../../lib/client/client.interface'
import ClientContext from '../../lib/client/context'
import ShareButton from '../buttons/share'
import styles from './social-share.purchase.module.scss'

export interface SocialSharePurchaseProps {
    className?: string
    testId?: string
}

const SocialSharePurchase: React.FC<SocialSharePurchaseProps> = ({
    className,
    testId,
}): JSX.Element => {
    const { t } = useTranslation('purchases-list')
    return (
        <ClientContext.Consumer>
            {(value) => {
                const client = value as Client
                return (
                    <div
                        className={classNames(styles.SocialShare, className)}
                        data-testid={testId ?? 'social-share-purchase'}
                    >
                        <span className={styles.RecommendLabel}>
                            {t('purchase.socialShareLabel')}
                        </span>
                        {!isNil(client.share.facebook) && (
                            <span className={classNames(styles.Facebook)}>
                                <ShareButton
                                    className={styles.Icon}
                                    variant='facebook'
                                    data={{
                                        url: client.share.facebook.url,
                                        quote: client.share.facebook.quote,
                                        hashtag: client.share.facebook.hashtag,
                                    }}
                                />
                            </span>
                        )}
                        {!isNil(client.share.twitter) && (
                            <span className={classNames(styles.Twitter)}>
                                <ShareButton
                                    className={styles.Icon}
                                    variant='twitter'
                                    data={{
                                        url: client.share.twitter.url,
                                        title: client.share.twitter.title,
                                        hashtags: client.share.twitter.hashtags,
                                    }}
                                />
                            </span>
                        )}
                        {!isNil(client.share.email) && (
                            <span className={classNames(styles.Email)}>
                                <ShareButton
                                    className={styles.Icon}
                                    variant='email'
                                    data={{
                                        url: client.share.email.url,
                                        subject: client.share.email.subject,
                                        body: client.share.email.body,
                                    }}
                                />
                            </span>
                        )}
                    </div>
                )
            }}
        </ClientContext.Consumer>
    )
}

SocialSharePurchase.displayName = 'Cards:SocialSharePurchase'

export default SocialSharePurchase
