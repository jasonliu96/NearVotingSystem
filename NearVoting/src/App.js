import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './global.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import NoLanding from './components/Landing/NoLanding'
import Navbar from './components/Navbar/Navbar'
import CandidateRegistration from './components/Admin/CandidateRegistration'
import ResultsPage from './components/User/ResultsPage'
import NoResultsPage from './components/User/NoResultsPage'
import VoterRegistration from './components/User/VoterRegistration'
import NoVoterRegistration from './components/User/NoVoterRegistration'
import VotingPage from './components/User/VotingPage'
import NoVotingPage from './components/User/NoVotingPage'
import AdminPage from './components/Admin/AdminPage'
import VoterProfile from './components/User/VoterProfile'
import CandidateProfile from './components/Admin/CandidateProfile'
import Settings from './components/User/Settings'
import constants from './constants'
import { executeTransaction } from './utils'
import LoadingSpinner from './components/LoadingSpinner'
import NotFound from './components/NotFound'
import NotAdminPage from './components/Admin/NotAdminPage'

function App() {
  const [phase, setphase] = useState(-1)
  const [selectValue, setselectvalue] = useState('')
  const [loading, setLoading] = useState(false)
  const [alertBoolean, setAlertBoolean] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const serverUrl = constants.SERVER_URL

  async function handleChange(e) {
    setselectvalue(e.target.value)
    console.log('this is the dropdown ' + e.target.value)
  }

  async function submitPhase(e) {
    setLoading(true)
    e.preventDefault()
    var phaseNumber = parseInt(selectValue)
    console.log('this is the dropdown ' + selectValue)
    try {
      const args = {
        phase: phaseNumber,
      }
      await executeTransaction(constants.SET_CONSTANT, args)
    } catch (e) {
      alert(
        'Something went wrong! ' +
          'Maybe you need to sign out and back in? ' +
          'Check your browser console for more info.',
      )
      setLoading(false)
      throw e
    } finally {
      setphase(selectValue)
      setLoading(false)
      setAlertBoolean(true)
    }
  }

  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <Router>
          <Navbar phase={phase} />
          <NoLanding />
        </Router>
      </>
    )
  }
  const WAIT_TIME = 5000
  useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        window.contract.getPhase({}).then((phaseFromContract) => {
          console.log(`phase from contract ${phaseFromContract}`)
          setphase(phaseFromContract)
        })
        // const id = setInterval(() => {
        //   window.contract.getPhase({}).then((phaseFromContract) => {
        //     console.log(`phase from contract ${phaseFromContract}`);
        //     setphase(phaseFromContract);
        //   });
        // }, WAIT_TIME);
        // return () => clearInterval(id);
        const accountId = window.walletConnection.getAccountId()
        const data = {
          accountId,
        }

        axios.post(`${serverUrl}/admin/checkIsAdmin`, data).then((res) => {
          if (res.status == 201) {
            console.log('User is an Admin')
            setIsAdmin(true)
          } else {
            console.log('User is not an admin')
            setIsAdmin(false)
          }
        })
      }
    },
    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    [phase],
  )

  return (
    <div className="App">
      <Router>
        <Navbar phase={phase} />
        <LoadingSpinner loading={loading} />
        <Routes>
          <Route path="" element={<NoLanding />} />
          <Route path="/profile" element={<VoterProfile />} />
          <Route path="/candiProfile" element={<CandidateProfile />} />
          <Route
            path="candidate/register"
            element={
              phase == 1 ? <CandidateRegistration /> : <NoVoterRegistration />
            }
          />
          <Route
            path="voter/register"
            element={
              phase == 1 ? <VoterRegistration /> : <NoVoterRegistration />
            }
          />
          <Route
            path="results"
            element={phase == 3 ? <ResultsPage /> : <NoResultsPage />}
          />
          <Route
            path="vote"
            element={phase == 2 ? <VotingPage /> : <NoVotingPage />}
          />
          <Route
            path="admin"
            element={
              isAdmin ? (
                <AdminPage
                  phase={phase}
                  selectValue={selectValue}
                  submit={submitPhase.bind(this)}
                  handleChange={handleChange.bind(this)}
                  alertBoolean={alertBoolean}
                />
              ) : (
                <NotAdminPage />
              )
            }
          />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
