import React from 'react';
import Fuse from 'fuse.js';
import globalClimateActionData from './data/global_climate_action.json';
import host_country_guests from './data/host_country_guests.json';
import intergovernmental_orgs from './data/intergovernmental_orgs.json';
import media from './data/media.json';
import non_governmental_orgs from './data/non_governmental_orgs.json';
import party_overflow from './data/party_overflow.json';
import special_agencies_and_rel_org from './data/special_agencies_and_rel_org.json';
import special_agencies_and_rel_org_overflow from './data/special_agencies_and_rel_org_overflow.json';
import temp_passes from './data/temp_passes.json';
import un_secretariat_units_bodies from './data/un_secretariat_units_bodies.json';
import un_secretariat_units_bodies_overflow from './data/un_secretariat_units_bodies_overflow.json';

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

    const columns = [
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

    const fuse = new Fuse(party_overflow, options);

    let handleButtonPress = function() {
        let results = fuse.search(name).map(result => (
            {
                ...result.item, 
                id: result.refIndex
            }
        ));
        setResults(results);
    }

    return ( <>
        <TextField
          id="outlined-controlled"
          label="String to search for"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }}
        />

        < Button variant = "contained"
            sx = {
                { 'backgroundColor': '#f50057' }
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
