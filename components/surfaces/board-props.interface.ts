export default interface BoardProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode
    className?: string
    component?: React.ElementType
    dataTestId?: string
    title?: string
    titleComponent?: React.ElementType
}
