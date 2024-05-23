/* eslint-disable react-hooks/exhaustive-deps */
import CheckIcon from '@mui/icons-material/Check'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import type { Theme } from '@mui/material'
import Popover, { PopoverProps } from '@mui/material/Popover'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import partial from 'lodash/partial'
import useTranslation from 'next-translate/useTranslation'
import type { FunctionComponent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import {
    PASSWORD_LENGTH_REGEX,
    PASSWORD_LOWER_UPPER_CASE_REGEX,
    PASSWORD_NUMBER_SYMBOL_REGEX,
} from '../../lib/validation/validation.const'
import LockOutlined from '../icons/lock-outlined'
import styles from './password-rules.module.scss'

export interface Props {
    className?: string
    password?: string
    anchor: HTMLInputElement | null
    containerRef: React.RefObject<HTMLDivElement | null>
    ariaDescribedby?: string
}

const PasswordRules: FunctionComponent<Pick<PopoverProps, 'onClose'> & Props> = ({
    className,
    password,
    anchor,
    onClose,
    containerRef,
    ariaDescribedby,
}: Pick<PopoverProps, 'onClose'> & Props): JSX.Element => {
    const { t } = useTranslation('security')

    const isLowerUpperCaseMeet = useMemo(
        partial(check, PASSWORD_LOWER_UPPER_CASE_REGEX, password),
        [password]
    )
    const isNumberSymbolMeet = useMemo(
        partial(check, PASSWORD_NUMBER_SYMBOL_REGEX, password),
        [password]
    )
    const isLengthMeet = useMemo(partial(check, PASSWORD_LENGTH_REGEX, password), [
        password,
    ])

    const theme: Theme = useTheme<Theme>()
    const isWidthInitial = useMediaQuery(theme.breakpoints.up('sm'))
    const [width, setWidth] = useState<number>(0)
    useEffect(() => {
        const element = containerRef.current
        const handler = partial(handleResize, element, width, setWidth)

        if (!isNil(element) && !width) {
            setWidth(element.offsetWidth)
        }

        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef.current])
    return (
        <Popover
            id={ariaDescribedby}
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            disableAutoFocus
            disableEnforceFocus
            data-testid={'popover-password-rules'}
            className={classNames(styles.Popover, className)}
        >
            <div
                className={styles.PopoverContent}
                style={isWidthInitial ? {} : { width: `${width}px` }}
            >
                <h4>
                    <LockOutlined className={styles.PopoverIconLock} />
                    <span>{t('passwordRules.header')}</span>
                </h4>
                <p>
                    {!isLowerUpperCaseMeet && (
                        <FiberManualRecordIcon className={styles.PopoverDotIcon} />
                    )}
                    {isLowerUpperCaseMeet && (
                        <CheckIcon className={styles.PopoverIconCheck} />
                    )}
                    <span>{t('passwordRules.lowerUpperCase')}</span>
                </p>
                <p>
                    {!isNumberSymbolMeet && (
                        <FiberManualRecordIcon className={styles.PopoverDotIcon} />
                    )}
                    {isNumberSymbolMeet && (
                        <CheckIcon className={styles.PopoverIconCheck} />
                    )}
                    <span>{t('passwordRules.includeOneDigit')}</span>
                </p>
                <p>
                    {!isLengthMeet && (
                        <FiberManualRecordIcon className={styles.PopoverDotIcon} />
                    )}
                    {isLengthMeet && <CheckIcon className={styles.PopoverIconCheck} />}
                    <span>{t('passwordRules.charactersLong')}</span>
                </p>
            </div>
        </Popover>
    )
}

export default PasswordRules

export const check = (regex: RegExp, value?: string): boolean =>
    !isNil(value) && regex.test(value)

export const handleResize = (
    element: HTMLDivElement | null,
    width: number,
    setWidth: (val: number) => void
): void => {
    if (isNil(element) || element.offsetWidth === width) return

    setWidth(element.offsetWidth)
}
