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
import axios from 'axios'

function CandidateRegistration() {
  // const [candidateName, setName] = React.useState("")
  const serverUrl = 'http://localhost:9999'
  const [fullName, setName] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [cityStateZip, setCityStateZip] = React.useState('')
  const [candidateId, setIdnumber] = React.useState('')
  const [partyAffiliation, setPartyAffiliation] = React.useState('')
  const [office, setOffice] = React.useState('')
  const [stateDistrict, setStateDistrict] = React.useState('')
  const [showNotification, setShowNotification] = React.useState(false)
  const [msg, setMsg] = React.useState('Added a Candidate')

  async function submitCandidate(e) {
    e.preventDefault()
    console.log(fullName)

    const data = {
      fullName,
      address,
      cityStateZip,
      candidateId,
      // statement,
      partyAffiliation,
      office,
      stateDistrict,
    }

    axios.defaults.withCredentials = false
    console.log(`Add Candidate with axios and : ${data}`)
    await axios.post(`${serverUrl}/candidate/addCandidate`, data).then(
      (response) => {
        console.log(response.data, response.status)
        if (response.status == 200) {
          console.log(`Add candidate was successfull: ${response.status}`)
        } else {
          console.log(`response for add candidate is: ${response.status}`)
        }
      },
      (error) => {
        console.log(`Error while adding candidate ${error}`)
      },
    )

    try {
      // make an update call to the smart contract
      await window.contract.addCandidate({
        // pass the value that the user entered in the greeting field
        text: fullName
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
            id="fullName"
            required
            label="Name of the Candidate (in full)"
            onChange={(e) => setName(e.target.value)}
            value={fullName}
            variant="filled"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="address"
            required
            label="Address (number and street)"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
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
            id="candidateId"
            label="FEC Candidate Identification Number"
            onChange={(e) => setIdnumber(e.target.value)}
            value={candidateId}
            variant="filled"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          {/* <FormLabel id="demo-radio-buttons-group-label">Is This Statement</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="New (N)"
            name="radio-buttons-group"
          >
            <FormControlLabel value="New (N)" control={<Radio />} label="New (N)" />
            <FormControlLabel value="Amended (A)" control={<Radio />} label="Amended (A)" />
          </RadioGroup> */}
          <TextField
            id="partyAffiliation"
            required
            onChange={(e) => setPartyAffiliation(e.target.value)}
            value={partyAffiliation}
            variant="filled"
            placeholder="None"
            color="secondary"
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="office"
            required
            label="Office Sought"
            onChange={(e) => setOffice(e.target.value)}
            value={office}
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
