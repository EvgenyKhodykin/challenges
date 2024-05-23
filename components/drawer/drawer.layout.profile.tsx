import isNil from 'lodash/isNil'
import partial from 'lodash/partial'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'

import logout from '../../lib/authentication/logout'
import Outlined from '../buttons/outlined'
import Menu from '../navigation/menu'
import Body from './body'
import Container from './container'
import styles from './drawer.layout.profile.module.scss'
import type Props from './drawer-props.interface'
import Footer from './footer'
import Header from './header'

const Drawer: React.FC<Props> = ({
    opened,
    handleClose,
    menu,
    profile,
}: Props): JSX.Element => {
    const router: NextRouter = useRouter()
    const { t } = useTranslation('common')

    useEffect(() => {
        const handler = partial(handleResize, opened, handleClose)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened])

    if (isNil(profile)) {
        return <></>
    }

    return (
        <Container
            variant='profile'
            isShown={opened}
            handleClose={handleClose}
            className={styles.Container}
        >
            <Header
                className={styles.Header}
                variant='profile'
                name={profile.fullName}
                email={profile.email}
                handleClose={handleClose}
            />
            <Body variant='profile' className={styles.Body}>
                <Menu variant={'drawer'} items={menu} />
            </Body>
            <Footer variant='profile' className={styles.Footer}>
                <Outlined onClick={partial(handleLogout, router)}>
                    {t('signOut')}
                </Outlined>
            </Footer>
        </Container>
    )
}

export default Drawer

export const handleResize = (opened: boolean, handleClose: () => void): void => {
    if (opened) {
        handleClose()
    }
}

export const handleLogout = (router: NextRouter): void => {
    logout()

    router.replace('/login')
}
