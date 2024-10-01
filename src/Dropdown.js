import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function Dropdown({ label, val, handleValChange, options }) {
  const formatName = (name) => {
    let currentName = name.replaceAll('_', ' ')

    return currentName
  }

  return (
    <Box sx={{ minWidth: 120, marginBottom: '10px' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          className='format-strings'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={val}
          label={label}
          onChange={handleValChange}
        >
          {options.map((item) => (
            <MenuItem
              value={item}
              className='my-anchor-element format-strings'
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
  val: PropTypes.string,
  handleValChange: PropTypes.func,
  options: PropTypes.array
}

export default Dropdown
