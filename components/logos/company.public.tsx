import Image from 'next/image'
import type { FunctionComponent } from 'react'

import styles from './company.public.module.scss'
import type CompanyProps from './company-props.interface'

type Props = Omit<CompanyProps, 'variant'>

const Company: FunctionComponent<Props> = ({ data }: Props): JSX.Element => (
    <div className={styles.Wrapper}>
        <Image
            src={data.logo.src}
            width={data.logo.width}
            height={data.logo.height}
            alt={data.name}
            priority={true}
        />
    </div>
)

Company.displayName = 'Logo:Company.public'

export default Company
