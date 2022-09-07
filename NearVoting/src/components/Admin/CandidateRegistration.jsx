import React from 'react';
// import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import Radio from '@mui/material/Radio'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  TextField,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from '@mui/material'
import Notification from '../Notification'

function CandidateRegistration() {
  // const [candidateName, setName] = React.useState("")
  const [candidateName, setName] = React.useState('')
  const [addressNumSt, setAddress] = React.useState('')
  const [cityStateZip, setCityStateZip] = React.useState('')
  const [idNumber, setIdnumber] = React.useState('')
  const [partyAffiliation, setPartyAffiliation] = React.useState('')
  const [officeSought, setOffice] = React.useState('')
  const [stateDistrict, setStateDistrict] = React.useState('')
  const [showNotification, setShowNotification] = React.useState(false)
  const [msg, setMsg] = React.useState('Added a Candidate')
  async function submitCandidate(e) {
    e.preventDefault()
    console.log(candidateName)
    try {
      // make an update call to the smart contract
      await window.contract.addCandidate({
        // pass the value that the user entered in the greeting field
        text: candidateName
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
          <TextField
            id="candidateName"
            required
            label="Name of the Candidate (in full)"
            onChange={(e) => setName(e.target.value)}
            value={candidateName}
            variant="filled"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="addressNumSt"
            required
            label="Address (number and street)"
            onChange={(e) => setAddress(e.target.value)}
            value={addressNumSt}
            variant="filled"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="cityStateZip"
            required
            label="City, State and Zip Code"
            onChange={(e) => setCityStateZip(e.target.value)}
            value={cityStateZip}
            variant="filled"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="idNumber"
            label="FEC Candidate Identification Number"
            onChange={(e) => setIdnumber(e.target.value)}
            value={idNumber}
            variant="filled"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <FormLabel id="demo-radio-buttons-group-label">Is This Statement</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="New (N)"
            name="radio-buttons-group"
          >
            <FormControlLabel value="New (N)" control={<Radio />} label="New (N)" />
            <FormControlLabel value="Amended (A)" control={<Radio />} label="Amended (A)" />
          </RadioGroup>
          <TextField
            id="partyAffiliation"
            required
            label="Party Affiliation"
            onChange={(e) => setPartyAffiliation(e.target.value)}
            value={partyAffiliation}
            variant="filled"
            placeholder="None"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="officeSought"
            required
            label="Office Sought"
            onChange={(e) => setOffice(e.target.value)}
            value={officeSought}
            variant="filled"
            placeholder="House"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="stateDistrict"
            required
            label="State and District of Candidate"
            onChange={(e) => setStateDistrict(e.target.value)}
            value={stateDistrict}
            variant="filled"
            placeholder="Virginia - District 1"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <Button size="small" onClick={submitCandidate}>Submit</Button>
        </FormControl>
      </div>
      {showNotification && <Notification method={msg} />}
    </div>
  );
}

export default CandidateRegistration;
