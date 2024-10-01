import React from 'react'
import './App.css'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { GridToolbar } from '@mui/x-data-grid'
import PropTypes from 'prop-types'

function ResultsGrid({ results }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'Nominator', headerName: 'Nominator', width: 125 },
    { field: 'Name', headerName: 'Name', width: 125 },
    { field: 'Functional title', headerName: 'Functional title', width: 125 },
    { field: 'Department', headerName: 'Department', width: 125 },
    { field: 'Organization', headerName: 'Organization', width: 125 },
    { field: 'Relation', headerName: 'Relation', width: 125 }
  ]

  return (
    <>
      {results.length > 0 ? (
        <DataGridPro
          rows={results}
          sx={{
            backgroundColor: '#B5E3D8'
          }}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } }
          }}
          columnVisibilityModel={{
            id: false
          }}
          pagination
          pageSizeOptions={[5, 10, 25]}
          autoHeight
          disableColumnFilter
          headerFilters
          slots={{
            toolbar: GridToolbar
          }}
        />
      ) : null}
    </>
  )
}

ResultsGrid.propTypes = {
  results: PropTypes.array
}

export default ResultsGrid
