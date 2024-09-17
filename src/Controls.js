import React from 'react';
import Fuse from 'fuse.js';
import * as Constants from './constants.js';
import { Option, Input } from '@mui/base';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
    FormGroup,
    FormControlLabel,
    Switch,
    Button,
    TextField
} from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GridToolbar } from '@mui/x-data-grid';

function Controls() {
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [name, setName] = React.useState('');
    const [results, setResults] = React.useState([]);
    const [dataset, setDataset] = React.useState('');

    const columns = [
        {field: 'id', headerName: 'ID', width: 10},
        {field: 'Nominator', headerName: 'Nominator', width: 125},
        {field: 'Name', headerName: 'Name', width: 125},
        {field: 'Functional title', headerName: 'Functional title', width: 125},
        {field: 'Department', headerName: 'Department',width: 125},
        {field: 'Organization', headerName: 'Organization',width: 125},
        {field: 'Relation', headerName: 'Relation',width: 125},
    ];

    const options = {
        keys : [
            "Nominator",
            "Functional title"
        ],
        threshold : 0.2
    };

    let handleButtonPress = function() {
        let data = Constants.Datasets[dataset];
        let fuse = new Fuse(data, options);
    
        let results = fuse.search(name).map(result => (
            {
                ...result.item, 
                id: result.refIndex
            }
        ));
        setResults(results);
    }

    const handleDatasetChange = (event) => {
        if (event) {
            setDataset(event.target.value);
        }
    }

    return ( <>

    <Box sx={{ minWidth: 120, marginBottom: '10px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={dataset}
          label="Dataset"
          onChange={handleDatasetChange}
        >
        {Constants.keys.map((item) => (
            <MenuItem 
            value={item}
            key={item}>
              {item}
            </MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>

        <TextField

            sx = { { width : '300px' } }
          id="outlined-controlled"
          label="Nominator or Title to search for..."
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
        /> 

        < Button variant = "contained"
            sx = {
                { 'backgroundColor': '#f50057', marginTop: '10px' }
            }
            onClick = { handleButtonPress }
        >
            Launch 
        </Button> 

        { results.length > 0 ?
        <DataGridPro
          rows={results}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 }, },
          }}
          pagination
          pageSizeOptions={[5, 10, 25]}
          autoHeight
          disableColumnFilter
          headerFilters
          slots={{
            toolbar: GridToolbar
          }}
        /> : 
            null }
    </>);
};

export default Controls;
