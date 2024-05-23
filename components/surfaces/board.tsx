import classNames from 'classnames'
import isNil from 'lodash/isNil'

import styles from './board.module.scss'
import Props from './board-props.interface'

const Board: React.FC<Props> = ({
    children,
    className,
    dataTestId,
    component: RootTag = 'div',
    title,
    titleComponent: TitleTag = 'h1',
}: Props): JSX.Element => (
    <RootTag
        className={classNames(styles.Root, className)}
        data-testid={dataTestId ?? 'surface-board'}
    >
        {!isNil(title) && <TitleTag className={styles.Title}>{title}</TitleTag>}
        {children}
    </RootTag>
)

Board.displayName = 'Surface:Board'

export default Board
