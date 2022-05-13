import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import Notification from '../Notification'

function CandidateRegistration() {
  const [candidateName, setName] = React.useState("")
  const [showNotification, setShowNotification] = React.useState(false)
  const [msg, setMsg ] = React.useState('Added a Candidate')
  async function submitCandidate(e){
    e.preventDefault()
    console.log(candidateName)
    try {
      // make an update call to the smart contract
      await window.contract.addCandidate({
        // pass the value that the user entered in the greeting field
        text:candidateName
      })
    } catch (e) {
      alert(
        'Something went wrong! ' +
        'Maybe you need to sign out and back in? ' +
        'Check your browser console for more info.'
      )
      throw e
    } finally {
      console.log("candidate added")
      setShowNotification(true)
    }
  }
  return (
    <div>
      <h1>Candidate Registration</h1>
      <div className="centeredText"> 
      <FormControl >
      <InputLabel htmlFor="my-input">Candidate Name</InputLabel>
      <Input onChange={(e)=>setName(e.target.value)} id="my-input" value={candidateName} />
      <Button size="small" onClick={submitCandidate}>Submit</Button>
      </FormControl>
      </div>
      {showNotification && <Notification method={msg}/>}
    </div>
  );
}

export default CandidateRegistration;
