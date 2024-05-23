export default interface ToggleProps<ItemsType> {
    value: string
    items: Array<ItemsType>
    i18nNamespace: string
    className?: string
    ariaLabel?: string
    handleToggle?: (key: string | Array<string>) => void
}
