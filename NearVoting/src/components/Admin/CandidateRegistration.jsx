import React from 'react';
// import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import Radio from '@mui/material/Radio';
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
} from '@mui/material';
import Notification from '../Notification';
import axios from 'axios';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Form from 'react-bootstrap/Form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { compressOid, executeTransaction } from '../../utils';
import constants from '../../constants';
function CandidateRegistration() {
  // const [candidateName, setName] = React.useState("")
  const serverUrl = 'http://localhost:9999';
  const [fullName, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [cityStateZip, setCityStateZip] = React.useState('');
  const [candidateId, setIdnumber] = React.useState('');
  const [partyAffiliation, setPartyAffiliation] = React.useState('');
  const [office, setOffice] = React.useState('');
  const [stateDistrict, setStateDistrict] = React.useState('');
  const [showNotification, setShowNotification] = React.useState(false);
  const [msg, setMsg] = React.useState('Added a Candidate');
  const [errors, setErrors] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [successOpen, setsuccessOpen] = React.useState(false);
  const [errorOpen, seterrorOpen] = React.useState(false);

  async function submitCandidate(e) {
    e.preventDefault();
    console.log(fullName);

    const data = {
      fullName,
      address,
      cityStateZip,
      candidateId,
      // statement,
      partyAffiliation,
      office,
      stateDistrict,
    };

    try {
      await validateInput(data);
      console.log('No errors occurred');

      axios.defaults.withCredentials = false;
      console.log(`Add Candidate with axios and : ${data}`);
      await axios.post(`${serverUrl}/candidate/addCandidate`, data).then(
        async (response) => {
          console.log(response.data, response.status);
          if (response.status == 200) {
            console.log(`Add candidate was successfull: ${response.status}`);
            // make an update call to the smart contract
            const compressedOid = compressOid(response.data.id);
            const args = {
              compressed_candidate: compressedOid,
            };
            await executeTransaction(constants.ADD_CONSTANT, args);
            seterrorOpen(false);
            setsuccessOpen(true);
          } else {
            console.log(`response for add candidate is: ${response.status}`);
            setsuccessOpen(false);
            seterrorOpen(true);
          }
        },
        (error) => {
          console.log(`Error while adding candidate ${error}`);
          setsuccessOpen(false);
          seterrorOpen(true);
        }
      );
    } catch (e) {
      alert(
        'Something went wrong! ' +
          'Maybe you need to sign out and back in? ' +
          'Check your browser console for more info.'
      );
      throw e;
    } finally {
      console.log('candidate added');
      setShowNotification(true);
    }
  }

  async function validateInput(data) {
    const {
      fullName,
      address,
      cityStateZip,
      candidateId,
      partyAffiliation,
      office,
      stateDistrict,
    } = data;

    if (!fullName.trim()) {
      console.log('Name field missing');
      setErrors((errors) => [...errors, 'Name should not be empty']);
    }
    if (!address.trim()) {
      console.log('Address field missing');
      setErrors((errors) => [...errors, 'Address should not be empty']);
    }
    if (!cityStateZip.trim()) {
      console.log('City, State and Zip are missing');
    }

    if (!partyAffiliation.trim()) {
      console.log('Party Affiliation info is missing');
    }

    if (!candidateId.trim()) {
      console.log('Candidate Id field missing');
      setErrors((errors) => [
        ...errors,
        'Candidate Id field should not be empty',
      ]);
    } else {
      const data = { candidateId };
      axios.defaults.withCredentials = false;
      console.log(`Checking if candidateId is unique: ${data}`);
      await axios
        .post(`${serverUrl}/candidate/checkUniquecandidateId`, data)
        .then(
          (response) => {
            console.log(response.status);
            if (response.status == 200) {
              console.log(`Candidate Id is unique: ${response.status}`);
            } else {
              console.log(`Candidate Id is not unique: ${response.status}`);
              setErrors((errors) => [
                ...errors,
                'Candidate Id should be unique',
              ]);
            }
          },
          (error) => {
            console.log(`Error while checkUniquecandidateId ${error}`);
          }
        );
    }

    if (!office.trim()) {
      console.log('Office info is missing');
      setErrors((errors) => [...errors, 'Office field should not be empty']);
    }
    if (!stateDistrict.trim()) {
      console.log('State and District info is missing');
      setErrors((errors) => [
        ...errors,
        'State and District field should not be empty',
      ]);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setErrors((errors) => []);
  };

  return (
    <div>
      <h1>Candidate Registration</h1>
      <div className='centeredText'>
        <Box
          sx={{
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '100px',
          }}
        >
          <Collapse in={successOpen}>
            <Alert
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setsuccessOpen(false);
                  }}
                >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Add Candidate Successful!
            </Alert>
          </Collapse>
        </Box>
        <Box
          sx={{
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '100px',
          }}
        >
          <Collapse in={errorOpen}>
            <Alert
              severity='error'
              action={
                <IconButton
                  aria-label='close'
                  color='error'
                  size='small'
                  onClick={() => {
                    seterrorOpen(false);
                  }}
                >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Add Candidate Failed!
            </Alert>
          </Collapse>
        </Box>
        <FormControl>
          <TextField
            id='fullName'
            required
            label='Name of the Candidate (in full)'
            onChange={(e) => setName(e.target.value)}
            value={fullName}
            variant='filled'
            color='secondary'
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id='address'
            required
            label='Address (number and street)'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            variant='filled'
            color='secondary'
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id='cityStateZip'
            required
            label='City, State and Zip Code'
            onChange={(e) => setCityStateZip(e.target.value)}
            value={cityStateZip}
            variant='filled'
            color='secondary'
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id='candidateId'
            required
            label='FEC Candidate Identification Number'
            onChange={(e) => setIdnumber(e.target.value)}
            value={candidateId}
            variant='filled'
            color='secondary'
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
            id='partyAffiliation'
            required
            label='Party Affiliation'
            onChange={(e) => setPartyAffiliation(e.target.value)}
            value={partyAffiliation}
            variant='filled'
            placeholder='None'
            color='secondary'
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id='office'
            required
            label='Office Sought'
            onChange={(e) => setOffice(e.target.value)}
            value={office}
            variant='filled'
            placeholder='House'
            color='secondary'
            style={{ width: '550px', margin: '10px' }}
          />
          <TextField
            id='stateDistrict'
            required
            label='State and District of Candidate'
            onChange={(e) => setStateDistrict(e.target.value)}
            value={stateDistrict}
            variant='filled'
            placeholder='Virginia - District 1'
            color='secondary'
            style={{ width: '550px', margin: '10px' }}
          />
          <Button size='small' onClick={submitCandidate}>
            Submit
          </Button>
        </FormControl>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Add Candidate Failed !'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {errors.map((txt) => (
              <p>{txt}</p>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* {showNotification && <Notification method={msg} />} */}
    </div>
  );
}

export default CandidateRegistration;
