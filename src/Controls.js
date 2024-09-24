import React from 'react';
import Fuse from 'fuse.js';
import * as Constants from './constants.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { GridToolbar } from '@mui/x-data-grid';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

function Controls() {
    const [searchTerms, setSearchTerms] = React.useState('');
    const [relation, setRelation] = React.useState('');
    const [nominator, setNominator] = React.useState('');
    const [results, setResults] = React.useState([]);
    const [datasetName, setDatasetName] = React.useState('');
    const [dataset, setDataset] = React.useState([]);
    const [relationTerms, setRelationTerms] = React.useState([]);

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
            "Functional title",
            "Department",
            "Organization"
        ],
        threshold : 0.2
    };

    let handleSubmit= function(event) {
        event.preventDefault();

        let filteredDataset = dataset;

        if(!!nominator) {
            filteredDataset = filteredDataset.filter(item => {
                return item.Nominator === nominator;
            });
        }

        if(!!relation) {
            filteredDataset = filteredDataset.filter(item => {
                return item.Relation === relation;
            });
        }

        Search(filteredDataset);
    }

    let Search = function(data) {
        let fuse = new Fuse(data, options);

        //if the user didn't enter a search term, then return the full dataset.
        if (!searchTerms) {
            setResults(data.map((item) => {
                return {
                    ...item,
                    id: crypto.randomUUID()
                }
            }));
        } else {
            let results = fuse.search(searchTerms).map((result) => {
                return {
                    ...result.item, 
                    id: result.refIndex
                }
            });
            setResults(results);
        }
}


    const handleNominatorChange = (event) => {
        if (event) {
            setNominator(event.target.value);
        }
    }

    const handleRelationChange = (event) => {
        if (event) {
            setRelation(event.target.value);
        }
    }

    const handleDatasetNameChange = (event) => {
        if (event) {
            setDatasetName(event.target.value);
            setDataset(Constants.Datasets[event.target.value]);

            let terms = Constants.Datasets[event.target.value].map(item => {return item.Relation});
            let unique = Array.from(new Set(terms));
            setRelationTerms(unique.sort());
        }
    }

    const formatName = (name) => {
        let currentName = name.replaceAll("_", " ");

        return currentName;
    }

    return ( <>
<Tooltip
  anchorSelect=".my-anchor-element"
  place = "right"
  content="Hello world!"
/>
        <form onSubmit={handleSubmit}>
    <Box sx={{ minWidth: 120, marginBottom: '10px', fontSize: '10px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={datasetName}
          label="Dataset"
          onChange={handleDatasetNameChange}
        >
        {Constants.keys.map((item) => (
            <MenuItem 
            value={item}
            className="my-anchor-element format-strings"
            data-tooltip-content={`Place description for ${item} here.`}
            key={item}>
               {formatName(item)} 
            </MenuItem>
            ))}
            </Select>
        </FormControl>
    </Box>
        <div>

        <Box sx={{ minWidth: 120, marginBottom: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Nominator</InputLabel>
                    <Select                                                    
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    placeholder="Nominator"
                    defaultValue={nominator}
                    label="Nominator"
                    name="nominator"
                    onChange={handleNominatorChange} >
                        {Constants.nominatorOptions.map((item) => (
                            <MenuItem 
                            value={item}
                            key={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

        <Box sx={{ minWidth: 120, marginBottom: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Relation to Nominator</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    placeholder="Relation to Nominator"
                    defaultValue={relation}
                    label="Relation"
                    name="relation"
                    onChange={handleRelationChange} >
                        {relationTerms.map((item) => (
                            <MenuItem 
                            value={item}
                            key={item}>
                            {item}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            </div>
        <TextField

            sx = { { width : '300px' } }
          id="outlined-controlled"
          label="Nominator, Title, Department, Organization to search for..."
          value={searchTerms}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchTerms(event.target.value);
                }}
        /> 

        < Button variant = "contained"
            sx = {
                { 'backgroundColor': '#f50057', marginTop: '10px' }
            }
            type="submit"
        >
            Search
        </Button> 
        </form>

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
