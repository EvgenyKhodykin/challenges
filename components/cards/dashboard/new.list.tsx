import classNames from 'classnames'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import AddIcon from '../../icons/add.large'
import challengeCardStyles from './dashboard.list.module.scss'
import componentStyles from './new.list.module.scss'
import type Props from './props.interface'

const Challenge: React.FC<Props> = ({ className }: Props): JSX.Element => {
    const { t } = useTranslation('dashboard')

    return (
        <Link
            href={'/challenges/join'}
            className={classNames(
                challengeCardStyles.Root,
                componentStyles.Root,
                className
            )}
        >
            <AddIcon className={componentStyles.Icon} />
            {t('challengeTiles.newChallengeTile.title')}
        </Link>
    )
}

Challenge.displayName = 'Cards:Challenge.new'

export default Challenge
