import React, { useState, useEffect } from 'react';
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
  Alert,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ConfirmationModal from '../ConfirmationModal';
import Notification from '../Notification';
import constants from '../../constants';
import { compressOid, decompressOids, executeTransaction } from '../../utils';
import LoadingSpinner from '../LoadingSpinner';
const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

function AdminPage(prop) {
  const serverUrl = constants.SERVER_URL;
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelCandidate] = useState('');
  const [wrongPhaseAlert, setWrongPhaseAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [textField, setTextField] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const removeCandidate = (e) => {
    e.preventDefault();
    if (prop.phase != 1) {
      setWrongPhaseAlert(true);
      return;
    }
    setSelCandidate(e.currentTarget.value);
    openModal();
  };

  async function confirmDelete(e) {
    e.preventDefault();
    if (textField == selectedCandidate) {
      closeModal();
      setLoading(true);
      const compressedOid = compressOid(textField);
      const args = { compressed_candidate: compressedOid };
      await executeTransaction(constants.DEL_CONSTANT, args);
      setDeleteAlert(true);
      setLoading(false);
    }
  }

  useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        var oids = [];
        // window.contract is set by initContract in index.js
        window.contract.getCandidateMap({}).then((candidateFromContract) => {
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
      <LoadingSpinner loading={loading} />
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Admin Page </h1>
        {prop.alertBoolean && (
          <Alert sx={{ width: '30%', margin: 5 }} severity='success'>
            Phase Successfully Changed
          </Alert>
        )}
        {wrongPhaseAlert && (
          <Alert
            onClose={() => {}}
            sx={{ width: '50%', margin: 5 }}
            severity='error'
          >
            Candidates can only be removed during registration phase
          </Alert>
        )}
        {deleteAlert && (
          <Alert
            onClose={() => {}}
            sx={{ width: '50%', margin: 5 }}
            severity='success'
          >
            {selectedCandidate} Successfully deleted.
          </Alert>
        )}
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
                    value={prop.selectValue}
                    onChange={prop.handleChange}
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
                      onClick={prop.submit}
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
      {showModal && (
        <ConfirmationModal
          onSubmit={confirmDelete}
          open={showModal}
          textField={textField}
          setTextField={setTextField}
          closeModal={closeModal}
          selectedCandidate={selectedCandidate}
        />
      )}
    </>
  );
}

export default AdminPage;
