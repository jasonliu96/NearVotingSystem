import React from 'react'
import axios from 'axios'
import getConfig from '../../config'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material'
import Notification from '../Notification'
import { compressOid, decompressOids, executeTransaction } from '../../utils'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import constants from '../../constants'

function VotingPage() {
  const serverUrl = 'http://localhost:9999'
  const [candidates, setCandidates] = React.useState([])
  const [showNotification, setShowNotification] = React.useState(false)
  const [hasVoted, setHasVoted] = React.useState(false)
  const [msg, setMsg] = React.useState('Submitted a Vote')
  const [errorOpen, seterrorOpen] = React.useState(false)
  const [errormsg, seterrormsg] = React.useState('')

  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        var oids = []
        // window.contract is set by initContract in index.js
        window.contract.getCandidateMap({}).then((candidateFromContract) => {
          // setCandidates(candidateFromContract)
          for (const [key, value] of Object.entries(candidateFromContract)) {
            oids.push({ name: decompressOids(key), votes: value })
          }
          const accountId = window.walletConnection.getAccountId()
          const data = {
            accountId,
          }
          axios.post(`${serverUrl}/voter/getHasVoted`, data).then((res) => {
            // status = 201, voter is registered in db
            if (res.data.status == 201) {
              const voted = res.data.data[0].hasVoted
              console.log('Voting Status ' + voted)
              setHasVoted(voted)
              if (voted) {
                seterrormsg('You can only vote once!')
                seterrorOpen(true)
              }
            } else {
              // disable if the user is not registered
              setHasVoted(true)
              seterrormsg('You cannot vote untill you register!')
              seterrorOpen(true)
            }
          })
          axios
            .post(`${serverUrl}/candidate/getCandidateInfo`, { oids })
            .then((res) => {
              if (res.status == 200) {
                setCandidates(res.data)
              }
            })
        })
      }
    },
    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    [],
  )

  async function submitVote(e) {
    e.preventDefault()
    var target_oid = e.target.value
    console.log(target_oid)
    setMsg('Submitted a Vote')

    // update in db that voter has cast a vote
    const accountId = window.walletConnection.getAccountId()
    const data = {
      accountId,
    }
    await axios.post(`${serverUrl}/voter/updateHasVoted`, data).then((res) => {
      if (res.status == 201) {
        console.log('Vote has been registered successfully')
      } else {
        console.log('Please check backend logs for error')
      }
    })

    try {
      const args = {
        candidate_oid: compressOid(target_oid)
      }
      await executeTransaction(constants.VOTE_CONSTANT, args).then(()=>{
        setHasVoted(true)
      })
    } catch (e) {
      alert(
        'Something went wrong! ' +
          'Maybe you need to sign out and back in? ' +
          'Check your browser console for more info.',
      )
      throw e
    } finally {
      const newState = candidates.map((cand) => {
        // 👇️ if id equals 2, update country property
        if (cand.oid === target_oid) {
          return { ...cand, votes: cand.votes + 1 }
        }
        // 👇️ otherwise return object as is
        return cand
      })
      setCandidates(newState)
      setShowNotification(true)
    }
  }
  return (
    <>
      <main>
        <h1>Candidates</h1>
        <Box
          sx={{
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '50px',
          }}
        >
          <Collapse in={errorOpen}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {errormsg}
            </Alert>
          </Collapse>
        </Box>
        <p> Below are the candidates you can vote for </p>
        <div style={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              alignItems: 'flex-start',
              maxWidth: 1500,
              borderRadius: 1,
            }}
          >
            {candidates?.length > 0 ? (
              candidates.map((value, index) => (
                <Card key={index} sx={{ border: 1, p: 1, m: 1, maxWidth: 150 }}>
                  <CardContent>
                    <Typography>{value.fullName}</Typography>
                    <Typography>
                      Party Affiliation: {value.partyAffiliation}
                    </Typography>
                    <Typography>Office: {value.office}</Typography>
                    <Typography>District: {value.stateDistrict}</Typography>
                    <Typography># Votes: {value.votes}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={submitVote}
                      value={value.oid}
                      disabled={hasVoted}
                      size="small"
                    >
                      Vote
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <p>No Candidates Added Yet</p>
            )}
          </Box>
        </div>
      </main>
      {showNotification && <Notification method={msg} />}
    </>
  )
}

export default VotingPage
