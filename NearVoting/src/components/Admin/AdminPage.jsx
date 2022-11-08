import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  List,
  ListItem,
  Divider,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationModal from '../ConfirmationModal';
import Notification from '../Notification';

import { decompressOids } from '../../utils';
const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

function AdminPage({
  phases,
  submit,
  selectValue,
  handleChange,
  successOpen,
  handleModalChange,
}) {
  const serverUrl = 'http://localhost:9999';
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelCandidate] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = React.useState('Submitted a Vote');
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const removeCandidate = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setMsg('Removed Candidate');
    setSelCandidate(e.currentTarget.value);
    openModal();
  };
  async function confirmDelete(e) {
    e.preventDefault();
    if (e.target.value === 'Delete') {
      const idx = parseInt(selectedCandidate);
      try {
        // make an update call to the smart contract
        await window.contract.removeCandidate({
          // pass the value that the user entered in the greeting field
          index: idx,
        });
      } catch (e) {
        alert(
          'Something went wrong! ' +
            'Maybe you need to sign out and back in? ' +
            'Check your browser console for more info.'
        );
        throw e;
      } finally {
        setShowNotification(true);
      }
    } else {
    }
    closeModal();
  }

  useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        var oids = [];
        // window.contract is set by initContract in index.js
        window.contract.getCandidateMap({}).then((candidateFromContract) => {
          // setCandidates(candidateFromContract)
          for (const [key, value] of Object.entries(candidateFromContract)) {
            oids.push({ name: decompressOids(key), votes: value });
          }
          setCandidates(oids);
        });
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  );

  return (
    <>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h1>Admin Page </h1>
        <div
          className='AdminPage'
          style={{
            width: '100%',
            align: 'center',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div className='PhaseChange' style={{ width: '20%' }}>
            <Card sx={{ display: 'flex' }}>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
                  <InputLabel id='demo-simple-select-autowidth-label'>
                    Phase
                  </InputLabel>
                  <Select
                    name='selectList'
                    id='selectList'
                    value={selectValue}
                    onChange={handleChange}
                    autoWidth
                    label='Phase'
                  >
                    <MenuItem value='1'>Registration Phase</MenuItem>
                    <MenuItem value='2'>Voting Phase</MenuItem>
                    <MenuItem value='3'>Result Phase</MenuItem>
                  </Select>
                  <div>
                    <Button
                      variant='outlined'
                      type='submit'
                      value='Submit'
                      onClick={submit}
                      style={{ textAlign: 'center', marginTop: 20, width: 200 }}
                    >
                      {' '}
                      Submit
                    </Button>
                  </div>
                </FormControl>
              </div>
            </Card>
          </div>
          <div className='CandidateList' style={{ width: '40%' }}>
            <Card sx={{ display: 'flex' }}>
              {candidates?.length > 0 ? (
                <List sx={style}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant='h6'
                    component='div'
                  >
                    Candidates List
                  </Typography>
                  {candidates.map((value, index) => (
                    <div key={index}>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ListItem>{value.name}</ListItem>
                        <Button onClick={removeCandidate} value={value.name}>
                          <CloseIcon />
                        </Button>
                      </div>
                      <Divider />
                    </div>
                  ))}
                </List>
              ) : (
                <div>
                  <p>No Candidates Added Yet</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      {showNotification && <Notification method={'phase changed'} />}
      {showModal && (
        <ConfirmationModal
          onSubmit={confirmDelete}
          open={showModal}
          closeModal={closeModal}
          selectedCandidate={selectedCandidate}
        />
      )}
    </>
  );
}

export default AdminPage;
