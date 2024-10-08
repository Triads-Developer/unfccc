import React from 'react'
import * as Constants from './constants.js'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import ResultsGrid from './ResultsGrid.js'
import Dropdown from './Dropdown.js'
import Search from './search.js'

function Controls() {
  const [searchTerms, setSearchTerms] = React.useState('')
  const [relation, setRelation] = React.useState([])
  const [nominator, setNominator] = React.useState([])
  const [results, setResults] = React.useState([])
  const [datasetName, setDatasetName] = React.useState([])
  const [dataset, setDataset] = React.useState([])
  const [hideFilters, setHideFilters] = React.useState(false)

  let handleSubmit = function (event) {
    event.preventDefault()

    setResults(Search(dataset, nominator, relation, searchTerms))
  }

  const handleNominatorChange = (event) => {
    if (event) {
      if (event.target.value.indexOf('clear') !== -1) {
        setNominator([])
      } else if (event.target.value.indexOf('all') !== -1) {
        setNominator(Constants.nominatorOptions)
      } else {
        setNominator(event.target.value)
      }
    }
  }

  const handleRelationChange = (event) => {
    if (event) {
      if (event.target.value.indexOf('clear') !== -1) {
        setRelation([])
      } else if (event.target.value.indexOf('all') !== -1) {
        setRelation(Constants.relationOptions)
      } else {
        setRelation(event.target.value)
      }
    }
  }

  const handleDatasetNameChange = (event) => {
    if (event) {
      if (event.target.value.indexOf('clear') !== -1) {
        setDatasetName([])
        setDataset([])
      } else if (event.target.value.indexOf('all') !== -1) {
        setDatasetName(Constants.keys)
        setDataset(Object.values(Constants.Datasets).flat())
      } else {
        setDatasetName(event.target.value)
        setDataset(Constants.Datasets[event.target.value])
      }
    }
  }

  const resetFilters = () => {
    setNominator([])
    setRelation([])
    setDatasetName([])
    setDataset([])
    setSearchTerms('')
    setResults([])
    setHideFilters(false)
  }

  const handleHideFilterClick = () => {
    setHideFilters(!hideFilters)
  }

  return (
    <>
      <Tooltip anchorSelect='.my-anchor-element' place='right' content='Hello world!' className='tooltip' />
      <div className='search-fields'>
        <form onSubmit={handleSubmit}>
          <Box className={hideFilters ? 'hidden' : ''} sx={{ m: 3, marginTop: '25px' }}>
            <Dropdown
              label='Dataset'
              val={datasetName}
              handleValChange={handleDatasetNameChange}
              options={Constants.keys}
              allowMultiple={true}
            />
            <p>Text instructions here </p>
            <Dropdown
              label='Nominator'
              val={nominator}
              handleValChange={handleNominatorChange}
              options={Constants.nominatorOptions}
              allowMultiple={true}
            />
            <Dropdown
              label='Relation to Nominator'
              val={relation}
              handleValChange={handleRelationChange}
              options={Constants.relationOptions}
              allowMultiple={true}
            />

            <TextField
              sx={{ width: '500px' }}
              id='outlined-controlled'
              label='Title, Department, Organization'
              value={searchTerms}
              onChange={(event) => {
                setSearchTerms(event.target.value)
              }}
            />
          </Box>

          <Box className='filter-buttons'>
            <Button id='search-button' disabled={datasetName.length === 0} type='submit'>
              Search
            </Button>

            <Button variant='text' sx={{ margin: '20px' }} onClick={resetFilters}>
              Reset Filters
            </Button>

            <Button variant='text' sx={{ margin: '20px' }} onClick={handleHideFilterClick}>
              {hideFilters ? 'Show Filters' : 'Hide Filters'}
            </Button>
          </Box>
        </form>
      </div>
      <ResultsGrid results={results} />
    </>
  )
}

export default Controls
