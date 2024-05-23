export default interface PrivateProps {
    variant?: 'with-sidebar' | 'without-sidebar'
    header?: React.ReactNode
    footer?: React.ReactNode
    filters?: React.ReactNode
    menu?: React.ReactNode
    children?: React.ReactNode | string
    className?: string
    isFiltersOpened?: boolean
    onFilterToggle?: () => void
    onScroll?: (scrollTop: number) => void
}
