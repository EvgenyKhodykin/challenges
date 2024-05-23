import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import classNames from 'classnames'
import map from 'lodash/map'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import type ToggleLinkItem from '../../lib/forms/toggle-link-item.interface'
import toggleStyles from './toggle.module.scss'
import type ToggleProps from './toggle-props.interface'

export type Props = Pick<
    ToggleProps<ToggleLinkItem>,
    'value' | 'items' | 'i18nNamespace' | 'className' | 'ariaLabel'
>

const Toggle: React.FC<Props> = ({
    value,
    items,
    i18nNamespace,
    ariaLabel,
    className,
}: Props): JSX.Element => {
    const router = useRouter()
    const { t } = useTranslation(i18nNamespace)
    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            orientation={'horizontal'}
            aria-label={ariaLabel}
            className={classNames(toggleStyles.Root, className)}
        >
            {map(items, ({ href, id, i18n, testId }: ToggleLinkItem, index: number) => (
                <ToggleButton
                    onClick={() => router.push(href)}
                    value={href}
                    key={index}
                    data-testid={testId ? testId : `toggle-button-${index}`}
                    disabled={href === value}
                >
                    {t(`${i18n}.${id}`)}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}

Toggle.displayName = 'Input:Toggle.link'

export default Toggle
