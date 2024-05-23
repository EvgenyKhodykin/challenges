import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import Address from '../../lib/utils/address.interface'
import styles from './address.module.scss'

export interface TestIds {
    root?: string
    line1?: string
    line2?: string
    city?: string
    province?: string
    postalCode?: string
    country?: string
}

export interface Props {
    address?: Address
    className?: string
    testIds?: TestIds
}

const Address: React.FC<Props> = ({
    address,
    className,
    testIds,
}: Props): JSX.Element => {
    if (
        isNil(address) ||
        [
            address.line1,
            address.line2,
            address.city,
            address.province,
            address.postalCode,
            address.country,
        ].every((prop) => isEmpty(prop))
    ) {
        return <></>
    }

    return (
        <address
            className={classNames(styles.Address, className)}
            data-testid={testIds?.root ?? 'address'}
        >
            {!isEmpty(address.line1) && (
                <div data-testid={testIds?.line1 ?? 'line1'} className={styles.Line1}>
                    {address.line1}
                </div>
            )}
            {!isEmpty(address.line2) && (
                <div data-testid={testIds?.line2 ?? 'line2'} className={styles.Line2}>
                    {address.line2}
                </div>
            )}
            {!isEmpty(address.city) &&
                !isEmpty(address.province) &&
                !isEmpty(address.postalCode) &&
                !isEmpty(address.country) && (
                    <div>
                        <span
                            data-testid={testIds?.city ?? 'city'}
                            className={styles.City}
                        >
                            {address.city},&nbsp;
                        </span>
                        <span
                            data-testid={testIds?.province ?? 'province'}
                            className={styles.Province}
                        >
                            {address.province}&nbsp;
                        </span>
                        <span
                            data-testid={testIds?.postalCode ?? 'postalCode'}
                            className={styles.PostalCode}
                        >
                            {address.postalCode},&nbsp;
                        </span>
                        <span
                            data-testid={testIds?.country ?? 'country'}
                            className={styles.Country}
                        >
                            {address.country}
                        </span>
                    </div>
                )}
        </address>
    )
}

Address.displayName = 'Address'

export default Address
