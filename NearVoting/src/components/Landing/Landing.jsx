import React from 'react';
import { login, logout } from '../../utils'
import getConfig from '../../config'
import { Card, CardActions, CardContent, Typography, Button} from '@mui/material';
function Landing() {
  const [candidates, setCandidates] = React.useState([])
  const { networkId } = getConfig(process.env.NODE_ENV || 'development')

  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {

        // window.contract is set by initContract in index.js
        window.contract.getCandidates({  })
          .then(candidateFromContract => {
            setCandidates(candidateFromContract)
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
    }
  }
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>Welcome to NearVoting!</h1>
        <p>
          To Make use of this voting application you first need to login!
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
    <main>
      <h1>Candidates</h1>
      <p> Below are the candidates you can vote for </p>
      {candidates?.length>0
      ?
      candidates.map((value, index)=>(
      <div key={index}>
        <Card sx={{ maxWidth: 150 }}>
          <CardContent>
            <Typography>
              {value.name} id:{index}
            </Typography>
            <Typography>
              # Votes:  {value.votes}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={submitVote} value={index}size="small">Vote</Button>
          </CardActions>
        </Card>
      </div>
      ))
      :
      <p>No Candidates Added Yet</p>}
    </main>
  );
}

export default Landing;
