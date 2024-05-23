import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import isNil from 'lodash/isNil'
import partial from 'lodash/partial'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

import {
    PASSWORD_LENGTH_REGEX,
    PASSWORD_LOWER_UPPER_CASE_REGEX,
    PASSWORD_NUMBER_SYMBOL_REGEX,
} from '../../lib/validation/validation.const'
import styles from './password-strength.module.scss'

export interface Props {
    className?: string
    password?: string
}

const PasswordStrength: FunctionComponent<Props> = ({
    password,
    className,
}: Props): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const strength = useMemo(partial(getStrength, password), [password])
    return (
        <svg viewBox='0 0 22 22' className={classNames(styles.Svg, className)}>
            <AnimatePresence>
                <path
                    className={styles.Empty}
                    d='M11,0C4.93,0,0,4.93,0,11s4.93,11,11,11,11-4.93,11-11S17.07,0,11,0Zm0,18c-3.86,0-7-3.14-7-7s3.14-7,7-7,7,3.14,7,7-3.14,7-7,7Z'
                />
                {['weak', 'normal', 'strong'].includes(strength) && (
                    <motion.path
                        key={'weak'}
                        className={styles.Weak}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'linear' }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.3, ease: 'linear' },
                        }}
                        d='M11.01,0s0,0,0,0V4s0,0,0,0c3.86,0,7,3.14,7,7,0,1.22-.31,2.36-.86,3.36l3.5,1.93c.86-1.57,1.36-3.37,1.36-5.29C22.01,4.93,17.07,0,11.01,0Z'
                    />
                )}
                {['normal', 'strong'].includes(strength) && (
                    <motion.path
                        key={'normal'}
                        className={styles.Normal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'linear' }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.3, ease: 'linear' },
                        }}
                        d='M11.01,18c-2.49,0-4.68-1.31-5.92-3.28l-3.37,2.15c1.95,3.08,5.38,5.13,9.29,5.13,4.15,0,7.77-2.31,9.64-5.71l-3.5-1.93c-1.19,2.17-3.5,3.64-6.14,3.64Z'
                    />
                )}
                {strength === 'strong' && (
                    <motion.path
                        key={'strong'}
                        className={styles.Strong}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'linear' }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.3, ease: 'linear' },
                        }}
                        d='M4.01,11c0-3.86,3.14-7,6.99-7V0C4.94,0,0,4.94,0,11,0,13.16,.64,15.17,1.72,16.87l3.37-2.15c-.68-1.08-1.08-2.35-1.08-3.72Z'
                    />
                )}
            </AnimatePresence>
        </svg>
    )
}

PasswordStrength.displayName = 'Interactivity:PasswordStrength'

export default PasswordStrength

export const getStrength = (password?: string): string => {
    if (isNil(password)) {
        return 'empty'
    }

    const isLowerUpperCaseValid = PASSWORD_LOWER_UPPER_CASE_REGEX.test(password)
    const isNumberSymbolValid = PASSWORD_NUMBER_SYMBOL_REGEX.test(password)
    const isLengthValid = PASSWORD_LENGTH_REGEX.test(password)

    const meetCriteria = [
        isLowerUpperCaseValid,
        isNumberSymbolValid,
        isLengthValid,
    ].filter((value) => value)

    return ['empty', 'weak', 'normal', 'strong'][meetCriteria.length]
}
