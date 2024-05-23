import { useCycle } from 'framer-motion'
import { useContext } from 'react'

import type MenuItem from '../../lib/navigation/menu-item.interface'
import Context from '../../lib/user/user.context'
import Button from '../buttons/drawer.profile'
import Layout from './drawer.layout.profile'

export interface Props {
    menu: Array<MenuItem>
}

const Component: React.FC<Props> = ({ menu }: Props): JSX.Element => {
    const context = useContext(Context)
    const [profileOpened, toggleProfileOpened] = useCycle<boolean>(false, true)

    if (context.loading || !context.user) {
        return <></>
    }

    return (
        <div>
            <Button
                onClick={() => toggleProfileOpened()}
                userName={context.user.fullName}
            />
            <Layout
                opened={profileOpened}
                handleClose={() => toggleProfileOpened()}
                menu={menu}
                profile={context.user}
            />
        </div>
    )
}

export default Component
