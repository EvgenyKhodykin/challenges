import classNames from 'classnames'
import isFunction from 'lodash/isFunction'
import { useCallback, useMemo } from 'react'

import type TagData from '../../lib/forms/tag.interface'
import IconClose from '../icons/close.small'
import styles from './tag.module.scss'

export interface TestIds {
    root?: string
    text?: string
}

export interface Props {
    data: TagData
    onRemove?: (value: string | number) => void
    className?: string
    testIds?: TestIds
}

const Tag: React.FC<Props> = ({ data, className, onRemove }: Props): JSX.Element => {
    const isRemoveShown = useMemo(() => isFunction(onRemove), [onRemove])

    const handleRemove = useCallback(
        () => onRemove && onRemove(data.value),
        [onRemove, data]
    )
    return (
        <div className={classNames(styles.Root, className)}>
            <span className={styles.Text}>{data.text}</span>
            {isRemoveShown && (
                <button onClick={handleRemove} className={styles.Button}>
                    <IconClose className={styles.Icon} />
                </button>
            )}
        </div>
    )
}

Tag.displayName = 'Inputs:Tag'

export default Tag
