import Grid from '@mui/material/Grid'
import useAffiliates from 'lib/pages/affiliates/hook.affiliates'
import UserProvider from 'lib/user/user.provider'
import type { GetServerSideProps, NextPage } from 'next'

import Drawer from '../components/drawer'
import Footer from '../components/footers/footer.general'
import Layout from '../components/layouts/private'
import Wrapper from '../components/layouts/wrapper'
import Menu from '../components/navigation/menu'
import SectionHeading from '../components/sections/affiliates/heading'
import SectionList from '../components/sections/affiliates/list'
import SectionMain from '../components/sections/affiliates/main'
import getPageServerSideProps from '../lib/pages/affiliates/get-server-side-props'
import Props from '../lib/pages/affiliates/props.interface'
import styles from './affiliates.module.scss'

const Affiliates: NextPage<Props> = ({ menus }: Props): JSX.Element => {
    const [state, setFilterTime] = useAffiliates()

    return (
        <UserProvider>
            <Wrapper variant='private'>
                <Layout
                    variant='without-sidebar'
                    header={<Drawer variant='profile' menu={menus.profile} />}
                    footer={
                        <Footer>
                            <Menu variant={'footer'} items={menus.bottom} />
                        </Footer>
                    }
                    filters={<p>&nbsp;</p>}
                    menu={<Menu variant={'main'} items={menus.top} />}
                >
                    <main className={styles.Main}>
                        <Grid container rowSpacing={{ md: 2 }} columnSpacing={{ md: 2 }}>
                            <Grid item xs={12}>
                                <SectionHeading
                                    data={{
                                        amount: state.affiliate.data.pendingPayout,
                                        currency: 'USD',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SectionMain
                                    state={state}
                                    setFilterTime={setFilterTime}
                                />
                            </Grid>
                            <Grid item xs={12} xl={6} className={styles.SectionLink}>
                                <SectionList
                                    variant='link'
                                    isLoading={state.affiliate.loading}
                                    affiliate={state.affiliate.data}
                                    campaigns={state.campaigns.data}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                xl={6}
                                className={styles.SectionPayoutAddress}
                            >
                                <SectionList
                                    variant='payout'
                                    isLoading={state.affiliate.loading}
                                    i18nNamespace='affiliates'
                                    initialValues={{
                                        btc_payout_address:
                                            state.affiliate.data.btcWalletAddress,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </main>
                </Layout>
            </Wrapper>
        </UserProvider>
    )
}

Affiliates.displayName = 'Page:Affiliates'

export default Affiliates

export const getServerSideProps: GetServerSideProps<Props> = getPageServerSideProps
