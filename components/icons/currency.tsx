import IconUsd from './usa'

export interface CurrencyProps {
    className?: string
    variant?: string //'usd' | 'eur' | 'gbp' | 'czk' | 'cad' | 'aud' | 'chf'
}

const Currency: React.FC<CurrencyProps> = ({
    variant,
    ...props
}: CurrencyProps): JSX.Element => {
    switch (variant?.toLocaleLowerCase()) {
        case 'usd':
            return <IconUsd {...props} />
        //@todo: Add icons for other currencies
        default:
            return <></>
    }
}

Currency.displayName = 'Icon:Currency'

export default Currency
