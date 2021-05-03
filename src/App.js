import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { MenuItem } from '@material-ui/core';
import axios from 'axios';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import format from 'date-fns/format'
import Pagination from '@material-ui/lab/Pagination'

import {states} from './constants/states';
import {getResults} from './services/results';
import Results from './Results';

const App = () => {
  const [stateList] = useState(states);
  const [districtList, setDistrictList] = useState([]);
  const [selectedStateObj, setSelectedStateObj] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDistrictObj, setSelectedDistrictObj] = useState("");
  const [age, setAge] = useState('');
  const [pin, setPin] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [results, setResults] = useState(null);
  const [currPage, setCurrPage] = useState(1);

  const getDistricts = async (event) => {
    try {
      const res = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+event.target.value._id, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US',
        }
      });
      if(res.data.districts.length > 0) {
        setDistrictList(res.data.districts)
      }
    } catch(err) {
      console.error(err);
    }
  }

  const handleStateChange = (event) => {
    setSelectedStateObj(event.target.value);
    getDistricts(event);
  }

  const handleDistrictChange = (event) => {
    setSelectedDistrictObj(event.target.value);
  }

  const handleDateChange = (date) => setSelectedDate(date);
  const handlePinInput = e => setPin(e.target.value);
  const handleAgeInput = e => setAge(e.target.value);

  const getFinalResults = async () => {
    const date = format(new Date(selectedDate), 'dd-MM-yyyy');
    setLoading(true);
    const resultsList = await getResults(pin, date, selectedDistrictObj.district_id);
    if(resultsList && resultsList.length !== 0) {
      if(age.trim() !== '') {
        const final = resultsList.filter(session => {
          return +age >= session.min_age_limit;
        });
        console.log(final);
        setResults(final);
      }
      else {
        setResults(resultsList);
      }
    }
    setLoading(false);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(selectedDate);
    getFinalResults();
  }

  const onPageChange = (event, page) => {
    setCurrPage(page);
  }

  return(
    <div style={{flex: 1, paddingTop: '30px', paddingBottom: '30px'}}>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3} style={{paddingRight: '350px', paddingLeft: '30px'}}>
          <Grid item xs={12} md={6} lg={6} sm={12}>
            <TextField
              select
              id='state-dropdown'
              label='Select State'
              value={selectedStateObj}
              onChange={handleStateChange}
              helperText='Please Select your State'
              style={{width: '300px', minWidth: '170px'}}
              required
              // variant='filled'
            >
              {stateList.map(state => (
                <MenuItem key={state._id} value={state}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sm={12}>
            <TextField
              select
              id='district-dropdown'
              label='Select District'
              value={selectedDistrictObj}
              onChange={handleDistrictChange}
              helperText='Please Select your District'
              style={{width: '300px', minWidth: '170px'}}
              disabled={!districtList.length>0}
              required
              // variant='filled'
            >
              {districtList.map(district => (
                <MenuItem key={district.district_id} value={district}>
                  {district.district_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} md={3} lg={3} sm={6}>
              <KeyboardDatePicker
                // margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="dd-MM-yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                helperText="Pick a date"
                required
                style={{
                  minWidth: '140px',
                }}
                // variant='filled'
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={12} md={3} lg={3} sm={6}>
            <TextField
              id='pin-field'
              label='Pincode'
              value={pin}
              onChange={handlePinInput}
              helperText='Enter Pincode'
              style={{width: '140px'}}
              // variant='filled'
            />
          </Grid>
          <Grid item xs={6} md={3} lg={3} sm={6}>
            <TextField
              id='age-field'
              label='Age'
              value={age}
              onChange={handleAgeInput}
              helperText='Enter Age'
              style={{width: '100px'}}
              // variant='filled'
            />
          </Grid>
          <Grid item xs={12} md={3} lg={3} sm={12}>
            <Button size='medium' variant='contained' color='primary' style={{
              height: '40px',
              marginTop: '10px'
            }}
            type='submit'
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      {results && <Results results={results} currPage={currPage} />}
      {results && 
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: '30px',
          }}
        >
          <Pagination count={Math.ceil(results.length/15)} color='primary' size='large' onChange={onPageChange}
            // style={{
            //   alig
            // }}
          />
        </div>
      }
    </div>
  );
  
}

export default App;