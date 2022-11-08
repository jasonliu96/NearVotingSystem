import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function ChangeStatePage({
  phases,
  submit,
  selectValue,
  handleChange,
  successOpen,
  handleModalChange,
}) {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h1>Change State Page </h1>
      <Collapse in={successOpen}>
        <Alert
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleModalChange}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Phase Change Successful
        </Alert>
      </Collapse>
      <div style={{ width: '100%', textAlign: 'center', margin: 10 }}>
        {phases?.length > 0 ? (
          phases.slice(-1).map((value, index) => (
            <div key={index}>
              {(() => {
                if (value.phase == 1) {
                  return <div>Current Phase : Registration</div>;
                } else if (value.phase == 2) {
                  return <div>Current Phase : Voting</div>;
                } else if (value.phase == 3) {
                  return <div>Current Phase : Results</div>;
                }
              })()}
            </div>
          ))
        ) : (
          <p>The Voting process will start after selecting the Phase</p>
        )}
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
          <InputLabel id='demo-simple-select-autowidth-label'>Phase</InputLabel>
          <Select
            name='selectList'
            id='selectList'
            value={selectValue}
            onChange={handleChange}
            autoWidth
            label='Phase'
          >
            <MenuItem value='1'>Registration Phase</MenuItem> {' '}
            <MenuItem value='2'>Voting Phase</MenuItem> {' '}
            <MenuItem value='3'>Result Phase</MenuItem>
          </Select>
          <div>
            <Button
              variant='outlined'
              type='submit'
              value='Submit'
              onClick={submit}
              style={{ textAlign: 'center', marginTop: 20, width: 200 }}
            >
              {' '}
              Submit
            </Button>
          </div>
        </FormControl>
      </div>
    </div>
  );
}

export default ChangeStatePage;
