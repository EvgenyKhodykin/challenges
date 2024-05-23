import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import IconButton from '@mui/material/IconButton'
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions'
import classNames from 'classnames'
import reduce from 'lodash/reduce'
import times from 'lodash/times'
import React, { useMemo } from 'react'

import styles from './pagination.general.module.scss'

const Component: React.FC<TablePaginationActionsProps> = ({
    count,
    page,
    rowsPerPage,
    onPageChange,
}: TablePaginationActionsProps): JSX.Element => {
    const numberOfPages = useMemo(
        () => Math.ceil(count / rowsPerPage),
        [count, rowsPerPage]
    )
    const isFirstPage = useMemo(() => page === 0, [page])
    const isLastPage = useMemo(() => page >= numberOfPages - 1, [page, numberOfPages])
    const pages = useMemo(
        () => (numberOfPages - 2 > 0 ? times(numberOfPages - 2, (i) => i + 1) : []),
        [numberOfPages]
    )

    if (numberOfPages < 2) {
        return <></>
    }

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        onPageChange(event, page - 1)

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        onPageChange(event, page + 1)

    const createClickHandler =
        (value: number) => (event: React.MouseEvent<HTMLButtonElement>) =>
            onPageChange(event, value)

    let beforeDots = false,
        afterDots = false,
        currentSet = false

    return (
        <div className={styles.Root}>
            <IconButton
                disabled={isFirstPage}
                onClick={handleBackButtonClick}
                className={styles.Previous}
            >
                <ArrowBackIosRoundedIcon />
            </IconButton>
            {isFirstPage && (
                <span className={classNames(styles.Text, styles.Current)}>1</span>
            )}
            {!isFirstPage && (
                <button
                    type='button'
                    onClick={createClickHandler(0)}
                    className={styles.Button}
                >
                    1
                </button>
            )}

            {reduce(
                pages,
                (r: Array<React.ReactNode>, item) => {
                    if (item === page) {
                        currentSet = true
                        r.push(
                            <span
                                className={classNames(styles.Text, styles.Current)}
                                key={item}
                            >
                                {item + 1}
                            </span>
                        )
                    } else if (item === page - 1 || item === page + 1) {
                        r.push(
                            <button
                                key={item}
                                type='button'
                                onClick={createClickHandler(item)}
                                className={styles.Button}
                            >
                                {item + 1}
                            </button>
                        )
                    } else if (!beforeDots && !currentSet) {
                        beforeDots = true
                        r.push(
                            <span className={styles.Text} key={item}>
                                ...
                            </span>
                        )
                    } else if (!afterDots && currentSet) {
                        afterDots = true
                        r.push(
                            <span className={styles.Text} key={item}>
                                ...
                            </span>
                        )
                    }
                    return r
                },
                []
            )}

            {isLastPage && (
                <span className={classNames(styles.Text, styles.Current)}>
                    {numberOfPages}
                </span>
            )}
            {!isLastPage && (
                <button
                    type='button'
                    className={styles.Button}
                    onClick={createClickHandler(numberOfPages - 1)}
                >
                    {numberOfPages}
                </button>
            )}
            <IconButton
                disabled={isLastPage}
                onClick={handleNextButtonClick}
                className={styles.Next}
            >
                <ArrowForwardIosRoundedIcon />
            </IconButton>
        </div>
    )
}

Component.displayName = 'Tables:Pagination.general'

export default Component
