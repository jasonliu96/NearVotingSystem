import React from 'react';
import axios from 'axios'
import { login, logout } from '../../utils'
import getConfig from '../../config'
import { Card, CardActions, CardContent, Typography, Button, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import  Notification  from '../Notification';
import ConfirmationModal from '../ConfirmationModal';
function Landing1() {
  const serverUrl = 'http://localhost:9999'
  const [candidates, setCandidates] = React.useState([])
  const [selectedCandidate, setSelCandidate] = React.useState(0)
  const [showNotification, setShowNotification] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [msg, setMsg ] = React.useState('Submitted a Vote')
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  async function confirmDelete (e){
    e.preventDefault();
    if(e.target.value==="Delete"){
      const idx = parseInt(selectedCandidate)
      try {
        // make an update call to the smart contract
        await window.contract.removeCandidate({
          // pass the value that the user entered in the greeting field
          index: idx
        })
      } catch (e) {
        alert(
          'Something went wrong! ' +
          'Maybe you need to sign out and back in? ' +
          'Check your browser console for more info.'
        )
        throw e
      } finally {
        setShowNotification(true)
      }
    }
    else {}
    closeModal()
  }
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        var oids;
        // window.contract is set by initContract in index.js
        window.contract.getCandidates({  })
          .then(candidateFromContract => {
            // setCandidates(candidateFromContract)
            oids = candidateFromContract
            console.log(oids)
            axios.post(`${serverUrl}/candidate/getCandidateInfo`,{oids}).then(
              (res)=>{
                if(res.status==200){
                  setCandidates(res.data)
                }
              }
            )
          })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )
  async function submitVote(e){
    e.preventDefault()
    console.log(e.target.value)
    const idx = parseInt(e.target.value)
    setMsg('Submitted a Vote')
    try {
      // make an update call to the smart contract
      await window.contract.voteCandidate({
        // pass the value that the user entered in the greeting field
        index: idx
      })
    } catch (e) {
      alert(
        'Something went wrong! ' +
        'Maybe you need to sign out and back in? ' +
        'Check your browser console for more info.'
      )
      throw e
    } finally {
      setShowNotification(true)
    }
  }
  const  removeCandidate = (e) =>{
    e.preventDefault()
    setMsg('Removed Candidate')
    setSelCandidate(e.currentTarget.value)
    openModal()
  }

  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>Welcome to NearVoting!</h1>
        <p>
          {/* To Make use of this voting application you first need to login! */}
        </p>
        <p>
          Go ahead and click the button below to try it out:
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }
  return (
    <>
    <main>
      <h1>Candidates</h1>
      <p> Below are the candidates you can vote for </p>
      <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          alignItems: 'flex-start',
          maxWidth: 1500,
          borderRadius: 1,}}>
      {candidates?.length>0
      ?
      candidates.map((value, index)=>(
        <Card key={index} sx={{ border: 1, p: 1, m: 1, maxWidth: 150 }}>
          <CardContent>
            <Typography>
              {value.fullName}
            </Typography>
            <Typography>
              Party Affiliation:  {value.partyAffiliation}
            </Typography>
            <Typography>
              Office:  {value.office}
            </Typography>
            <Typography>
              District:  {value.stateDistrict}
            </Typography>
            <Typography>
              # Votes:  {value.votes}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={submitVote} value={index} size="small">Vote</Button>
            <Button onClick={removeCandidate} value={index}><CloseIcon/></Button>
          </CardActions>
        </Card>
      ))
      :
      <p>No Candidates Added Yet</p>}
      </Box>
      </div>
    </main>
    {showModal && <ConfirmationModal 
        onSubmit={confirmDelete}
        open={showModal}
        closeModal={closeModal}
        selectedCandidate={candidates[selectedCandidate].name}/>}
    {showNotification && <Notification method={msg}/>}
    </>
  );
}

export default Landing1;