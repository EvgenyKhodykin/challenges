import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'

import ReloadIcon from '../icons/reload'
import Button from './primary.general'
import type PrimaryButtonProps from './primary-props.interface'
import type ButtonTestIds from './primary-test-ids.interface'
import styles from './reload.module.scss'

export interface TestIds {
    button?: ButtonTestIds
    text?: string
}

type ButtonProps = Pick<PrimaryButtonProps, 'className' | 'disabled' | 'onClick'>

export interface Props extends ButtonProps {
    text?: string
    testIds?: TestIds
}

const Reload: React.FC<Props> = ({ text, testIds, ...props }: Props): JSX.Element => {
    const { t } = useTranslation('common')

    return (
        <Button
            {...props}
            className={classNames(styles.Root, props.className)}
            testIds={testIds?.button}
        >
            <ReloadIcon className={styles.Icon} />
            <span
                className={styles.Text}
                data-testid={testIds?.text ?? 'buttons-reload-text'}
            >
                {text || t('refreshButtonLabel')}
            </span>
        </Button>
    )
}

Reload.displayName = 'Buttons:Reload'

export default Reload
