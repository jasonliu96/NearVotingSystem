import React from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  TextField,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

function VoterRegistration() {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [citizen, setCitizen] = React.useState('')
  const [assistance, setAssistance] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [identification, setIdentification] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [value, setValue] = React.useState('')
  //const [showNotification, setShowNotification] = React.useState(false)
  const [msg, setMsg] = React.useState('Added a Voter')

  async function submitVoter(e) {
    e.preventDefault()
    console.log(firstName)
    // try {
    //   // make an update call to the smart contract
    //   await window.contract.addCandidate({
    //     // pass the value that the user entered in the greeting field
    //     text:voterName
    //   })
    // } catch (e) {
    //   alert(
    //     'Something went wrong! ' +
    //     'Maybe you need to sign out and back in? ' +
    //     'Check your browser console for more info.'
    //   )
    //   throw e
    // } finally {
    //   console.log("Voter added")
    //   setShowNotification(true)
    // }
  }

  return (
    <div>
      <h1>Register as a voter!</h1>
      <div className="centeredText">
        <FormControl>
          <TextField
            id="firstName"
            label="First Name"
            defaultValue="Enter your First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="lastName"
            label="Last Name"
            defaultValue="Enter your Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            style={{ width: '550px', margin: '10px' }}
          />
          <FormControl style={{ width: '550px', margin: '10px' }}>
            <InputLabel id="citizen-label">
              Are you a citizen of the U.S.?
            </InputLabel>

            <Select
              labelId="citizen-label"
              id="citizen"
              value={citizen}
              label="Are you a citizen of the U.S.?"
              onChange={(e) => setCitizen(e.target.value)}
            >
              <MenuItem value={'yes'}>Yes</MenuItem>
              <MenuItem value={'no'}>No</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="email"
            label="Email Address"
            defaultValue="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id="phone"
            label="Phone Number"
            defaultValue="Enter your Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            style={{ width: '550px', margin: '10px' }}
          />

          <TextField
            id="identification"
            label="Identification"
            defaultValue="Enter last 4 digits of your SSN"
            onChange={(e) => setIdentification(e.target.value)}
            value={identification}
            style={{ width: '550px', margin: '10px' }}
          />

          <TextField
            id="address"
            label="Home Address"
            defaultValue="Enter your home address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            style={{ width: '550px', margin: '10px' }}
          />

          <FormControl style={{ width: '550px', margin: '10px' }}>
            <InputLabel id="citizen-label">
              Do you require any voting Assistance?
            </InputLabel>

            <Select
              labelId="assistance-label"
              id="assistance"
              value={assistance}
              label="Do you require any voting Assistance?"
              onChange={(e) => setAssistance(e.target.value)}
            >
              <MenuItem value={'yes'}>Yes</MenuItem>
              <MenuItem value={'no'}>No</MenuItem>
            </Select>
          </FormControl>

          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}

          <Button size="small" onClick={submitVoter}>
            Submit
          </Button>
        </FormControl>
      </div>
      {/* {showNotification && <Notification method={msg} />} */}
    </div>
  )
}

export default VoterRegistration
