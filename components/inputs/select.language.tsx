import { Box, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import MuiSelect from '@mui/material/Select'
import EarthIcon from 'components/icons/earth'
import Link from 'next/link.js'
import { useRouter } from 'next/router.js'
import { useState } from 'react'

import type SelectItem from '../../lib/forms/select-item.interface'
import IconArrowDown from '../icons/arrow-down'
import styles from './select.language.module.scss'

interface Props {
    items: Array<SelectItem>
}

const Component: React.FC<Props> = ({ items }): JSX.Element => {
    const router = useRouter()
    const [language, setLanguage] = useState(router.locale)

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string)
    }

    return (
        <Box className={styles.container}>
            <EarthIcon />
            <FormControl className={styles.form} fullWidth>
                <MuiSelect
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 0,
                        },
                        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                            {
                                border: 'none',
                            },
                    }}
                    IconComponent={IconArrowDown}
                    value={language}
                    onChange={handleChange}
                >
                    {items.map(
                        ({ value, label }: SelectItem, index: number): JSX.Element => (
                            <MenuItem key={index} value={value} className={styles.item}>
                                <Link
                                    href='#'
                                    locale={`${value}`}
                                    key={`${label}`}
                                    className={styles.link}
                                >
                                    {label}
                                </Link>
                            </MenuItem>
                        )
                    )}
                </MuiSelect>
            </FormControl>
        </Box>
    )
}

Component.displayName = 'Inputs:LanguageSelect'

export default Component
