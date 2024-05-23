// import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { EmailShareButton } from 'react-share'

import { ShareEmail } from '../../../lib/utils/share.interface'
import EmailIcon from '../../icons/email'
import styles from './share.module.scss'
import type ShareProps from './share-props.interface'

export type Props = Omit<ShareProps, 'variant'>

const Share: FunctionComponent<Props> = ({
    children,
    className,
    data,
}: Props): JSX.Element => {
    const share = data as ShareEmail

    // const rippleRef = useRef<TouchRippleActions>(null)
    // const onRippleStart = (e: React.MouseEvent) => {
    //     if (rippleRef.current) {
    //         rippleRef.current.start(e)
    //     }
    // }
    // const onRippleStop = (e: React.MouseEvent) => {
    //     if (rippleRef.current) {
    //         rippleRef.current.stop(e)
    //     }
    // }

    return (
        <div
            className={classNames(styles.IconButton, className)}
            data-testid='button-share-email'
        >
            {
                <EmailShareButton
                    url={share.url}
                    subject={share.subject}
                    body={share.body}
                    className={styles.IconButton}
                    // onMouseDown={onRippleStart}
                    // onMouseUp={onRippleStop}
                >
                    <EmailIcon className={styles.Icon} />
                    {children}
                </EmailShareButton>
            }
            {/* <TouchRipple ref={rippleRef} center={false} /> */}
        </div>
    )
}

Share.displayName = 'Button:Share.email'

export default Share
