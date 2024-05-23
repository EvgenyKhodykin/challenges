import 'moment/min/locales'

import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import moment from 'moment'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Fragment, useMemo } from 'react'

import { TRADING_HISTORY_HEAD } from '../../../lib/challenges/challenges.const'
import type CSVDataRow from '../../../lib/utils/csv-data-row.interface'
import TableSortingHeader from '../../../lib/utils/table.sorting-header.interface'
import type { Headers as ExportCSVHeaders } from '../../buttons/export/csv'
import ExportCSV from '../../buttons/export/csv'
import Button from '../../buttons/primary.general'
import type { Props as DatePickerProps } from '../../inputs/date'
import DatePicker from '../../inputs/date'
import styles from './actions.module.scss'

export interface Props {
    inputs: Array<Pick<DatePickerProps, 'label' | 'onChange' | 'value'>>
    handleClear: () => void
    csv: Array<CSVDataRow>
    id: string
}

const Component: React.FC<Props> = ({
    inputs,
    handleClear,
    csv,
    id,
}: Props): JSX.Element => {
    const { t } = useTranslation('challenge-details')
    const router = useRouter()

    const exportHeaders: ExportCSVHeaders = useMemo(
        () =>
            map(TRADING_HISTORY_HEAD, (item: TableSortingHeader) => ({
                label: item.label,
                key: item.id === 'cmd' ? 'type' : item.id,
            })),
        []
    )
    return (
        <div className={styles.Root}>
            {map(inputs, (input: DatePickerProps, index: number) => (
                <Fragment key={index}>
                    <DatePicker {...input} className={styles.Input} />
                </Fragment>
            ))}
            {!isEmpty(inputs) && (
                <Button
                    onClick={handleClear}
                    className={classNames(styles.Button, styles.Clear)}
                >
                    {t('tradingHistory.journal.clearFiltersButton')}
                </Button>
            )}
            <ExportCSV
                headers={exportHeaders}
                data={csv}
                fileName={`${id}--${moment()
                    .locale(router.locale as string)
                    .format('ll--HH-mm-ss')}.csv`}
                className={styles.Button}
            >
                {t('tradingHistory.journal.exportButton')}
            </ExportCSV>
        </div>
    )
}

Component.displayName = 'Tables:TradingHistory:Actions'

export default Component
