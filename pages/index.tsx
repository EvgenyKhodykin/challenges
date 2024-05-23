import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import UserProvider from 'lib/user/user.provider'
import type { GetServerSideProps, NextPage } from 'next'
import { useMemo } from 'react'

import Drawer from '../components/drawer'
import Footer from '../components/footers/footer.general'
import Header from '../components/headers/dashboard'
import Layout from '../components/layouts/private'
import Wrapper from '../components/layouts/wrapper'
import Menu from '../components/navigation/menu'
import SectionFilters from '../components/sections/dashboard/filters'
import SectionFiltersBadges from '../components/sections/dashboard/filters.badges'
import List from '../components/sections/dashboard/list'
import getPageServerSideProps from '../lib/pages/dashboard/get-server-side-props'
import useDashboard from '../lib/pages/dashboard/hook.dashboard'
import Props from '../lib/pages/dashboard/props.interface'
import type { ToggleGeneralItem } from '../lib/utils/toggle-items.interface'
import styles from './challenge-list.module.scss'

const ChallengesList: NextPage<Props> = ({ menus }: Props): JSX.Element => {
    const theme: Theme = useTheme<Theme>()
    const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('md'))

    const filterCurrencyVariants = useMemo(
        (): Array<ToggleGeneralItem> => [{ key: 'USD', element: 'USD' }],
        []
    )

    const filterAmountVariants = useMemo(
        (): Array<ToggleGeneralItem> => [
            { key: '10K', element: '10K' },
            { key: '25K', element: '25K' },
            { key: '50K', element: '50K' },
            { key: '100K', element: '100K' },
            { key: '500K', element: '500K' },
        ],
        []
    )

    const [
        state,
        filterType,
        filterCurrency,
        filterAmount,
        handleAmountVariantChange,
        handleChangeStatus,
        handleRefresh,
        handleFilterToggle,
        handleScroll,
        handleListLayout,
    ] = useDashboard()

    const filtersBadgesDesktop = useMemo(() => {
        if (!isDesktop) {
            return <></>
        }
        return (
            <SectionFiltersBadges
                filters={state.filters}
                onFilterType={filterType}
                filterCurrencyVariants={filterCurrencyVariants}
                filterCurrencyValues={state.filterCurrency}
                onFilterCurrency={filterCurrency}
                filterAmountValues={state.filterAmount}
                filterAmountVariants={filterAmountVariants}
                onFilterAmount={filterAmount}
            />
        )
    }, [
        isDesktop,
        state,
        filterType,
        filterCurrencyVariants,
        filterCurrency,
        filterAmountVariants,
        filterAmount,
    ])

    return (
        <UserProvider>
            <Wrapper variant='private'>
                <Layout
                    variant='with-sidebar'
                    header={<Drawer variant='profile' menu={menus.profile} />}
                    footer={
                        <Footer>
                            <Menu variant={'footer'} items={menus.bottom} />
                        </Footer>
                    }
                    onFilterToggle={handleFilterToggle}
                    filters={
                        <SectionFilters
                            isFilterOpened={state.isFilterOpened}
                            filters={state.filters}
                            onFilterType={filterType}
                            filterCurrencyVariants={filterCurrencyVariants}
                            filterCurrencyValues={state.filterCurrency}
                            onFilterCurrency={filterCurrency}
                            filterAmountValues={state.filterAmount}
                            filterAmountVariants={filterAmountVariants}
                            onFilterAmount={filterAmount}
                            onToggleFilters={handleFilterToggle}
                        />
                    }
                    isFiltersOpened={state.isFilterOpened}
                    menu={<Menu variant={'main'} items={menus.top} />}
                    onScroll={handleScroll}
                >
                    <main
                        className={styles.ContentPlaceholder}
                        data-testid='main-content'
                    >
                        <Header
                            amountVariant={state.amountVariant}
                            onChangeAmountVariant={handleAmountVariantChange}
                            statusFilter={state.statusFilter}
                            onChangeStatusFilter={handleChangeStatus}
                            handleRefresh={handleRefresh}
                            isRefreshing={state.isRefreshing}
                            className={styles.Header}
                        >
                            {filtersBadgesDesktop}
                        </Header>
                        <List state={state} onLayout={handleListLayout} />
                    </main>
                </Layout>
            </Wrapper>
        </UserProvider>
    )
}

ChallengesList.displayName = 'Page:ChallengesList'

export default ChallengesList

export const getServerSideProps: GetServerSideProps<Props> = getPageServerSideProps
