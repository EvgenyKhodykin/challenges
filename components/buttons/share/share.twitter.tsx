// import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { TwitterShareButton } from 'react-share'

import { ShareTwitter } from '../../../lib/utils/share.interface'
import TwitterIcon from '../../icons/twitter'
import styles from './share.module.scss'
import type ShareProps from './share-props.interface'

export type Props = Omit<ShareProps, 'variant'>

const Share: FunctionComponent<Props> = ({
    children,
    className,
    data,
}: Props): JSX.Element => {
    const share = data as ShareTwitter

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
            data-testid='button-share-twitter'
        >
            {
                <TwitterShareButton
                    url={share.url}
                    title={share.title}
                    hashtags={share.hashtags}
                    className={styles.IconButton}
                    // onMouseDown={onRippleStart}
                    // onMouseUp={onRippleStop}
                >
                    <TwitterIcon className={styles.Icon} />
                    {children}
                </TwitterShareButton>
            }
            {/* <TouchRipple ref={rippleRef} center={false} /> */}
        </div>
    )
}

Share.displayName = 'Button:Share.twitter'

export default Share
