import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function Dropdown({ label, val, handleValChange, options, allowMultiple }) {
  const formatName = (name) => {
    let currentName = name.replaceAll('_', ' ')

    currentName = currentName.replaceAll('orgs', 'organizations')
    currentName = currentName.replaceAll('temp', 'temporary')
    currentName = currentName.replaceAll('units bodies', 'unites and bodies')
    return currentName
  }

  return (
    <Box sx={{ width: '100%', marginBottom: '10px' }}>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          className='format-strings'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          multiple={allowMultiple}
          value={val}
          label={label}
          onChange={handleValChange}
          slotProps={{ popup: { disablePortal: false } }}
        >
          <MenuItem key='clear' value='clear'>
            Clear selection
          </MenuItem>

          <MenuItem key='all' value='all'>
            Select All
          </MenuItem>

          {options.map((item) => (
            <MenuItem
              value={item}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#D9D9D9',
                  '&.Mui-focusVisible': { background: 'orange' }
                }
              }}
              className='format-strings'
              data-tooltip-content={`Place description for ${item} here.`}
              key={item}
            >
              {formatName(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

Dropdown.propTypes = {
  label: PropTypes.string,
  val: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  handleValChange: PropTypes.func,
  options: PropTypes.array,
  allowMultiple: PropTypes.bool
}

export default Dropdown
