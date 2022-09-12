import React, {useState,useEffect} from 'react';
import { Card, CardActions, CardContent, Typography, Button, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ChangeStatePage({phases, submit, selectValue, setselectvalue, handleChange}) {
  

  // const [phases,setphase] = useState([]);
  // const [selectValue,setselectvalue] = useState('');
  
  const [phase, setCount] = useState(1);
  const [phases,setphase] = useState([]);
  // const [selectValue,setselectvalue] = useState([]);
  const [selectValue,setselectvalue] = useState('');


  // async function handleChange(e){
  //   setselectvalue(e.target.value);
  //   console.log("this is the dropdown "+e.target.value)
  // }


  
  // async function submitCandidate(e){
  //   e.preventDefault()
  //   console.log("this is the dropdown "+selectValue)
  //   try {
  //     // make an update call to the smart contract
  //      window.contract.addstate({
  //       // pass the value that the user entered in the greeting field
  //       text:selectValue
  //     })
  //   } catch (e) {
  //     alert(
  //       'Something went wrong! ' +
  //       'Maybe you need to sign out and back in? ' +
  //       'Check your browser console for more info.'
  //     )
  //     throw e
  //   } finally {
  //     setphase([...phases,selectValue])
  //     console.log("PHASE added")
  //   }
  //   console.log("here is the phaselist")
  //   console.log("this is phase length from submitcandidate"+phases.length)
  // }


  // React.useEffect(
  //   () => {
  //     // in this case, we only care to query the contract when signed in
  //     if (window.walletConnection.isSignedIn()) {
        
  //       // window.contract is set by initContract in index.js
  //       window.contract.getPhases({  })
  //         .then(candidateFromContract => {
  //           console.log(candidateFromContract)
  //           setphase(candidateFromContract)
            
  //         })
  
          
  
  //     }
  //   },
  
  //   // The second argument to useEffect tells React when to re-run the effect
  //   // Use an empty array to specify "only run on first render"
  //   // This works because signing into NEAR Wallet reloads the page
  //   []
  // )
  
  
  
  
  
  
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
      <select name="selectList" id="selectList"  value={selectValue} onChange={handleChange} >
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
