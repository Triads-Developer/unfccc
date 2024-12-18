import React from 'react'
import * as Constants from './constants.js'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Tooltip } from 'react-tooltip'
import ResultsGrid from './ResultsGrid.js'
import Dropdown from './Dropdown.js'
import Search from './search.js'
import Link from '@mui/material/Link'

function Controls() {
  const [searchTerms, setSearchTerms] = React.useState('')
  const [relation, setRelation] = React.useState([])
  const [nominator, setNominator] = React.useState([])
  const [results, setResults] = React.useState([])
  const [datasetName, setDatasetName] = React.useState([])
  const [dataset, setDataset] = React.useState([])
  const [hideFilters, setHideFilters] = React.useState(false)
  const [searchAttempted, setSearchAttemped] = React.useState(false)

  let handleSubmit = function (event) {
    event.preventDefault()
    setResults(Search(dataset, nominator, relation, searchTerms))
    setSearchAttemped(true)
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
        let newDataset = []
        let newDatasetName = []
        event.target.value.forEach((element) => {
          newDataset.push(Constants.Datasets[element])
          newDatasetName.push(element)
        })

        setDatasetName(newDatasetName.flat())
        setDataset(newDataset.flat())
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
    setSearchAttemped(false)
  }

  const handleHideFilterClick = () => {
    setHideFilters(!hideFilters)
  }

  return (
    <>
      <Tooltip
        hidden={datasetName.length !== 0}
        anchorSelect='#search-button-box'
        place='right'
        content='Badge Category Required'
        className='tooltip'
      />
      <div className='search-fields'>
        <form onSubmit={handleSubmit}>
          <Box className={hideFilters ? 'hidden' : ''} sx={{ m: 3, marginTop: '25px' }}>
            <Box sx={{ maxWidth: '100%', pb: '1em' }}>
              <p>
                This site will allow you to view, query and export data from the UNFCCC COP 29 Final List of Participants data set (FLOP
                data) for on-site delegates.
              </p>
              <p>
                This data comes from the <Link href='https://unfccc.int/documents/644762'> UNFCCC Final List of Participants</Link> and{' '}
                <Link href='https://unfccc.int/documents/644763'>it’s associated on-site delegates-excel file</Link>. The excel file
                separates delegate by badge category and draws its data from what is submitted when a delegate is nominated and confirmed.
              </p>
              <p>
                This is a work in progress, and we hope it is helpful to you in your research and helps provide transparency of COP
                attendance. Let us know{' '}
                <Link hrf='https://docs.google.com/forms/d/e/1FAIpQLSdo2VOtnncR_F0PIWuHiKA4XdKa1Syq9N38jDZk7gu9bIR_ow/viewform'>
                  how you are using the data and if you have any suggestions for improvement by completing this form.
                </Link>
              </p>
            </Box>

            <Dropdown
              label='Badge Category *'
              val={datasetName}
              handleValChange={handleDatasetNameChange}
              options={Constants.keys}
              allowMultiple={true}
            />

            <Box sx={{ maxWidth: '100%' }}>
              <p>{Constants.nominatorInstructions}</p>
            </Box>

            <Dropdown
              label='Nominator'
              val={nominator}
              handleValChange={handleNominatorChange}
              options={Constants.nominatorOptions}
              allowMultiple={true}
            />

            <Box sx={{ maxWidth: '100%' }}>
              <p>{Constants.relationInstructions}</p>
            </Box>

            <Dropdown
              label='Relation to Nominator'
              val={relation}
              handleValChange={handleRelationChange}
              options={Constants.relationOptions}
              allowMultiple={true}
            />

            <Box sx={{ maxWidth: '100%' }}>
              <p>{Constants.searchBoxInstructions}</p>
              <p>{Constants.searchBoxNote}</p>
            </Box>

            <TextField
              sx={{ width: '100%' }}
              id='outlined-controlled'
              label='Title, Department, Organization, Nominated By, and Name'
              value={searchTerms}
              onChange={(event) => {
                setSearchTerms(event.target.value)
              }}
            />
          </Box>

          <Box className='filter-buttons'>
            <span id='search-button-box'>
              <Button id='search-button' disabled={datasetName.length === 0} type='submit'>
                Search
              </Button>
            </span>
            <Button variant='text' sx={{ margin: '20px' }} onClick={resetFilters}>
              Reset Filters
            </Button>

            <Button variant='text' sx={{ margin: '20px' }} onClick={handleHideFilterClick}>
              {hideFilters ? 'Show Filters' : 'Hide Filters'}
            </Button>
          </Box>
        </form>
      </div>
      {results.length === 0 && searchAttempted ? <h1>No results with above search criteria </h1> : <ResultsGrid results={results} />}
    </>
  )
}

export default Controls
