import React, {useState,useEffect} from 'react';
import { Card, CardActions, CardContent, Typography, Button, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ChangeStatePage({phases, submit, selectValue, handleChange}) {
  
  
  return (
    <div style={{ textAlign: 'center' }}>
    
      <h1>Change State Page </h1>

      <div style={{ width: '100%' }}>
      {phases?.length>0
      ?
      phases.slice(-1).map((value, index)=>(
        <div key={index}>
        {(() => {
          if (value.phase == 1) {
            return (
              <div>Registration Phase</div>
            )
          } else if (value.phase == 2) {
            return (
              <div>Voting Phase</div>
            )
          } else if (value.phase == 3) {
            return (
              <div>Results Phase</div>
            )
          }
        })()}
      </div>
      ))
      :
      <p>The Voting process will start after selecting the Phase</p>}
      
      </div>

      <form name="phaseselect">
      <select name="selectList" id="selectList"     value={selectValue} onChange={handleChange} >
      <option value="0">Select the phase</option>
      <option value="1">Registration Phase</option>
      <option value="2">Voting Phase</option>
      <option value="3">Result Phase</option>
    
      </select>
      <div><input type="submit" value="Submit" onClick={submit} style={{ textAlign: 'center', marginTop:15 }}></input></div>
      
      </form>      
    </div>
  );
}

export default ChangeStatePage;
