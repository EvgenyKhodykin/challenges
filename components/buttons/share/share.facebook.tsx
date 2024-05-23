// import TouchRipple, { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple'
import classNames from 'classnames'
import { FunctionComponent } from 'react'
import { FacebookShareButton } from 'react-share'

import { ShareFacebook } from '../../../lib/utils/share.interface'
import FacebookIcon from '../../icons/facebook'
import styles from './share.module.scss'
import type ShareProps from './share-props.interface'

export type Props = Omit<ShareProps, 'variant'>

const Share: FunctionComponent<Props> = ({
    children,
    className,
    data,
}: Props): JSX.Element => {
    const share = data as ShareFacebook

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
            data-testid='button-share-facebook'
        >
            {
                <FacebookShareButton
                    url={share.url}
                    quote={share.quote}
                    hashtag={share.hashtag}
                    className={styles.IconButton}
                    // onMouseDown={onRippleStart}
                    // onMouseUp={onRippleStop}
                >
                    <FacebookIcon className={styles.Icon} />
                    {children}
                </FacebookShareButton>
            }
            {/* <TouchRipple ref={rippleRef} center={false} /> */}
        </div>
    )
}

Share.displayName = 'Button:Share.facebook'

export default Share
