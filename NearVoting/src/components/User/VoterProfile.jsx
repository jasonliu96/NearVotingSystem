import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import constants from '../../constants';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function VoterProfile() {
  const serverUrl = constants.SERVER_URL;
  const [name, setName] = React.useState('');
  const [citizen, setCitizen] = React.useState('');
  const [assistance, setAssistance] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [identification, setIdentification] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [hasRegistered, sethasRegistered] = React.useState(true);

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      const accountId = window.walletConnection.getAccountId();
      const data = {
        accountId,
      };

      axios.post(`${serverUrl}/voter/getVoterProfile`, data).then((res) => {
        console.log('Getting profile info');
        console.log(res);
        if (res.data.status == 201) {
          console.log('Voter Info retreived');
          setName(res.data.data[0].name);
          setCitizen(res.data.data[0].citizen);
          setAssistance(res.data.data[0].assistance);
          setPhone(res.data.data[0].phone);
          setIdentification(res.data.data[0].identification);
          setEmail(res.data.data[0].email);
          setAddress(res.data.data[0].address);
        } else {
          console.log('Voter Not found');
          sethasRegistered(false);
        }
      });
    }
  }, []);

  return (
    <div>
      {!hasRegistered && <Navigate replace to='/register' />}
      <h1>Voter Profile</h1>
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
          <Box sx={{ width: '90%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Item>Name:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{name}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>U.S Citizen:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{citizen}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Email:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{email}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Phone No:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{phone}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Identification No:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{identification}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Address:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{address}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Voting Assistance:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{assistance}</Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default VoterProfile;
