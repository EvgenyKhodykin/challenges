import type MenuItem from '../../lib/navigation/menu-item.interface'
import type UserData from '../../lib/user/user.interface'

export default interface DrawerProps {
    opened: boolean
    handleClose: () => void
    menu: Array<MenuItem>
    profile?: UserData
    handleSignOut?: React.MouseEventHandler
}
