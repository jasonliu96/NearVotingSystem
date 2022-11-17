import React, { useState, useEffect } from 'react';
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

function CandidateProfile() {
  const serverUrl = constants.SERVER_URL;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cityStateZip, setCityStateZip] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [partyAffiliation, setPartyAffiliation] = useState('');
  const [office, setOffice] = useState('');
  const [stateDistrict, setStateDistrict] = useState('');
  const [hasRegistered, sethasRegistered] = useState(true);

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      const accId = window.walletConnection.getAccountId();
      const data = {
        accId,
      };

      axios.post(`${serverUrl}/candidate/getCandidateProfile`, data).then((res) => {
        console.log('Getting profile info');
        console.log(res);
        if (res.data.status == 201) {
          console.log('Candidate retreived');
          setName(res.data.data[0].fullName);
          setAddress(res.data.data[0].address);
          setCityStateZip(res.data.data[0].cityStateZip);
          setCandidateId(res.data.data[0].candidateId);
          setPartyAffiliation(res.data.data[0].partyAffiliation);
          setOffice(res.data.data[0].office);
          setStateDistrict(res.data.data[0].stateDistrict);
        } else {
          console.log('Candidate Not found');
          sethasRegistered(false);
        }
      });
    }
  }, []);

  return (
    <div>
      {!hasRegistered && <Navigate replace to='/register' />}
      <h1>Candidate Profile</h1>
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
                <Item>Address:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{address}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>city State Zip:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{cityStateZip}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Candidate Id:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{candidateId}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Party Affiliation:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{partyAffiliation}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Office:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{office}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>State District:</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{stateDistrict}</Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default CandidateProfile;
