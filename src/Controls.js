import React from 'react'
import Fuse from 'fuse.js'
import * as Constants from './constants.js'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import ResultsGrid from './ResultsGrid.js'
import Dropdown from './Dropdown.js'

function Controls() {
  const [searchTerms, setSearchTerms] = React.useState('')
  const [relation, setRelation] = React.useState('')
  const [nominator, setNominator] = React.useState('')
  const [results, setResults] = React.useState([])
  const [datasetName, setDatasetName] = React.useState('')
  const [dataset, setDataset] = React.useState([])

  const options = {
    keys: ['Nominator', 'Functional title', 'Department', 'Organization'],
    threshold: 0.2
  }

  let handleSubmit = function (event) {
    event.preventDefault()

    let filteredDataset = dataset

    if (nominator) {
      filteredDataset = filteredDataset.filter((item) => {
        return item.Nominator === nominator
      })
    }

    if (relation) {
      filteredDataset = filteredDataset.filter((item) => {
        return item.Relation === relation
      })
    }

    Search(filteredDataset)
  }

  let Search = function (data) {
    let fuse = new Fuse(data, options)

    //if the user didn't enter a search term, then return the full dataset.
    if (!searchTerms) {
      setResults(
        data.map((item) => {
          return {
            ...item,
            id: crypto.randomUUID()
          }
        })
      )
    } else {
      let results = fuse.search(searchTerms).map((result) => {
        return {
          ...result.item,
          id: result.refIndex
        }
      })
      setResults(results)
    }
  }

  const handleNominatorChange = (event) => {
    if (event) {
      setNominator(event.target.value)
    }
  }

  const handleRelationChange = (event) => {
    if (event) {
      setRelation(event.target.value)
    }
  }

  const handleDatasetNameChange = (event) => {
    if (event) {
      setDatasetName(event.target.value)
      setDataset(Constants.Datasets[event.target.value])
    }
  }

  const resetFilters = () => {
    setNominator('')
    setRelation('')
    setDatasetName('')
    setDataset('')
    setSearchTerms('')
  }

  return (
    <>
      <Tooltip anchorSelect='.my-anchor-element' place='right' content='Hello world!' className='tooltip' />
      <form onSubmit={handleSubmit}>
        <Dropdown label='Dataset' val={datasetName} handleValChange={handleDatasetNameChange} options={Constants.keys} />
        <Dropdown label='Nominator' val={nominator} handleValChange={handleNominatorChange} options={Constants.nominatorOptions} />
        <Dropdown label='Relation to Nominator' val={relation} handleValChange={handleRelationChange} options={Constants.relationOptions} />

        <TextField
          sx={{ width: '300px' }}
          id='outlined-controlled'
          label='Nominator, Title, Department, Organization to search for...'
          value={searchTerms}
          onChange={(event) => {
            setSearchTerms(event.target.value)
          }}
        />

        <Box>
          <Button variant='contained' disabled={!datasetName} sx={{ backgroundColor: '#971B2F', margin: '10px' }} type='submit'>
            Search
          </Button>

          <Button variant='text' sx={{ margin: '10px' }} onClick={resetFilters}>
            Reset Filters
          </Button>
        </Box>
      </form>

      <ResultsGrid results={results} />
    </>
  )
}

export default Controls
