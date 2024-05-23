import type TestIds from './rules-test-ids.interface'

export default interface RulesProps {
    handleClick: React.MouseEventHandler
    className?: string
    testIds?: TestIds
}
