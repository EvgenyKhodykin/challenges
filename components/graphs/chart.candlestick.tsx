import classNames from 'classnames'
import dynamic from 'next/dynamic'

import styles from './chart.candlestick.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export interface Props {
    data: Array<{ x: unknown; y: unknown }>
    className?: string
}

const Component: React.FC<Props> = ({ className, data }: Props): JSX.Element => (
    <div className={classNames(styles.Root, className)}>
        <Chart
            type={'candlestick'}
            series={[
                {
                    data: data,
                },
            ]}
            height='350px'
            width='100%'
            options={{
                chart: {
                    type: 'area',
                    stacked: false,
                    height: 350,
                    width: '100%',
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true,
                    },
                    toolbar: {
                        autoSelected: 'zoom',
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: 'Stock Price Movement',
                    align: 'left',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100],
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return (val / 1000000).toFixed(0)
                        },
                    },
                    title: {
                        text: 'Price',
                    },
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val) {
                            return (val / 1000000).toFixed(0)
                        },
                    },
                },
            }}
        />
    </div>
)

Component.displayName = 'Graphs:Chart.area'

export default Component
