import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Form from 'react-bootstrap/Form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom';
import constants from '../../constants';
import LoadingSpinner from '../LoadingSpinner';
function VoterRegistration() {
  const serverUrl = constants.SERVER_URL;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [citizen, setCitizen] = useState('');
  const [assistance, setAssistance] = useState('');
  const [phone, setPhone] = useState('');
  const [identification, setIdentification] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [value, setValue] = useState('');
  //const [showNotification, setShowNotification] = useState(false)
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [successOpen, setsuccessOpen] = useState(false);
  const [errorOpen, seterrorOpen] = useState(false);
  const [hasRegistered, sethasRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submitVoter(e) {
    e.preventDefault();
    setLoading(true);
    console.log(`Account ID: ${window.walletConnection.getAccountId()}`);
    const accountId = window.walletConnection.getAccountId();
    const name = firstName + ' ' + lastName;
    console.log(name);
    console.log(
      accountId,
      firstName,
      lastName,
      name,
      citizen,
      assistance,
      phone,
      identification,
      email,
      address
    );

    const data = {
      accountId,
      firstName,
      lastName,
      name,
      citizen,
      assistance,
      phone,
      identification,
      email,
      address,
    };

    await validateInput(data);
    console.log('No errors occurred');
    axios.defaults.withCredentials = false;
    console.log(`Register voter with axios and : ${data}`);
    if (window.walletConnection.isSignedIn()) {
      window.contract.getPhase({}).then(async (phaseFromContract) => {
        console.log(`phase from contract ${phaseFromContract}`);
        if (phaseFromContract == 1) {
          await axios.post(`${serverUrl}/voter/registerVoter`, data).then(
            (response) => {
              console.log(response.data, response.status);
              if (response.status == 200) {
                console.log(
                  `Register voter is successfull: ${response.status}`
                );
                seterrorOpen(false);
                setLoading(false);
                setsuccessOpen(true);
                sethasRegistered(true);
              } else {
                console.log(
                  `response for register voter is: ${response.status}`
                );
                setsuccessOpen(false);
                setLoading(false);
                seterrorOpen(true);
              }
            },
            (error) => {
              console.log(`Error while registering voter ${error}`);
              setsuccessOpen(false);
              setLoading(false);
              seterrorOpen(true);
            }
          );
        } else {
          setErrors((errors) => [
            ...errors,
            'The Registration Phase has ended. Please refresh the page.',
          ]);
          setsuccessOpen(false);
          setLoading(false);
          setOpen(true);
        }
      });
    }
  }

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      const accountId = window.walletConnection.getAccountId();
      const data = {
        accountId,
      };

      axios.post(`${serverUrl}/voter/getHasRegistered`, data).then((res) => {
        if (res.status == 201) {
          console.log('Voter has already registered successfully');
          sethasRegistered(true);
        } else {
          console.log('Voter hasnt registered yet');
          sethasRegistered(false);
        }
      });
    }
    if (errors.length > 0) {
      console.log('Error has occurred');
      setOpen(true);
    }
  }, [errors]);

  async function validateInput(data) {
    const {
      firstName,
      lastName,
      name,
      citizen,
      assistance,
      phone,
      identification,
      email,
      address,
    } = data;

    if (!firstName.trim()) {
      console.log('first name field missing');
      setErrors((errors) => [...errors, 'First Name should not be empty']);
    }
    if (!lastName.trim()) {
      console.log('lastName field missing');
      setErrors((errors) => [...errors, 'Last Name should not be empty']);
    }
    if (!name.trim()) {
      console.log('Name field missing');
    }

    if (!phone.trim()) {
      console.log('phone field missing');
    }

    if (!identification.trim()) {
      console.log('identification field missing');
      setErrors((errors) => [
        ...errors,
        'Identification field should not be empty',
      ]);
    } else {
      const data = { identification };
      axios.defaults.withCredentials = false;
      console.log(`Checking if identification is unique: ${data}`);
      await axios
        .post(`${serverUrl}/voter/checkUniqueIdentification`, data)
        .then(
          (response) => {
            console.log(response.status);
            if (response.status == 200) {
              console.log(`Identification is unique: ${response.status}`);
            } else {
              console.log(`Identification is not unique: ${response.status}`);
              setErrors((errors) => [
                ...errors,
                'Identification number should be unique',
              ]);
            }
          },
          (error) => {
            console.log(`Error while checkUniqueIdentification ${error}`);
          }
        );
    }

    if (!email.trim()) {
      console.log('email field missing');
      setErrors((errors) => [...errors, 'Email field should not be empty']);
    }
    if (!address.trim()) {
      console.log('address field missing');
      setErrors((errors) => [...errors, 'Address field should not be empty']);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setErrors((errors) => []);
  };

  return (
    <>
      <LoadingSpinner loading={loading} />
      {hasRegistered && <Navigate to='/profile' replace={true} />}
      <div>
        <h1>Voter Registration</h1>
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
                Voter Registration Successfull!
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
                Voter Registration Failed!
              </Alert>
            </Collapse>
          </Box>
          <Form onSubmit={submitVoter}>
            <FormControl>
              <TextField
                id='firstName'
                label='First Name'
                defaultValue='Enter your First Name'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                style={{ width: '550px', margin: '10px' }}
                required
              />
              <TextField
                id='lastName'
                label='Last Name'
                defaultValue='Enter your Last Name'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                style={{ width: '550px', margin: '10px' }}
                required
              />
              <FormControl style={{ width: '550px', margin: '10px' }}>
                <InputLabel id='citizen-label'>
                  Are you a citizen of the U.S.?
                </InputLabel>

                <Select
                  labelId='citizen-label'
                  id='citizen'
                  value={citizen}
                  label='Are you a citizen of the U.S.?'
                  onChange={(e) => setCitizen(e.target.value)}
                  required
                >
                  <MenuItem value={'yes'}>Yes</MenuItem>
                  <MenuItem value={'no'}>No</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id='email'
                label='Email Address'
                type='email'
                defaultValue='Enter your email address'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ width: '550px', margin: '10px' }}
                required
              />
              <TextField
                id='phone'
                label='Phone Number'
                defaultValue='Enter your Phone Number'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                style={{ width: '550px', margin: '10px' }}
                pattern='^[0-9]{10}$'
                required
              />

              <TextField
                id='identification'
                label='Identification'
                defaultValue='Enter last 4 digits of your SSN'
                onChange={(e) => setIdentification(e.target.value)}
                value={identification}
                style={{ width: '550px', margin: '10px' }}
                required
              />

              <TextField
                id='address'
                label='Home Address'
                defaultValue='Enter your home address'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                style={{ width: '550px', margin: '10px' }}
                required
              />

              <FormControl style={{ width: '550px', margin: '10px' }}>
                <InputLabel id='citizen-label'>
                  Do you require any voting Assistance?
                </InputLabel>

                <Select
                  labelId='assistance-label'
                  id='assistance'
                  value={assistance}
                  label='Do you require any voting Assistance?'
                  onChange={(e) => setAssistance(e.target.value)}
                  required
                >
                  <MenuItem value={'yes'}>Yes</MenuItem>
                  <MenuItem value={'no'}>No</MenuItem>
                </Select>
              </FormControl>

              <Button type='submit' size='small'>
                Submit
              </Button>
            </FormControl>
          </Form>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Voter Registration Failed !'}
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
      </div>
    </>
  );
}

export default VoterRegistration;
