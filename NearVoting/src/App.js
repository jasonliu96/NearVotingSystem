import React, { useState, useEffect } from 'react';
import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import CandidateRegistration from './components/Admin/CandidateRegistration';
import ResultsPage from './components/User/ResultsPage';
import NoResultsPage from './components/User/NoResultsPage';
import VoterRegistration from './components/User/VoterRegistration';
import NoVoterRegistration from './components/User/NoVoterRegistration';
import VotingPage from './components/User/VotingPage';
import NoVotingPage from './components/User/NoVotingPage';
import ConnectionCheck from './components/ConnectionCheck';
import AdminPage from './components/Admin/AdminPage';
import VoterProfile from './components/User/VoterProfile';

function App() {
  const [phases, setphase] = useState(-1);
  const [selectValue, setselectvalue] = useState('');
  const [successOpen, setsuccessOpen] = React.useState(false);

  async function handleChange(e) {
    setselectvalue(e.target.value);
    console.log('this is the dropdown ' + e.target.value);
  }
  async function handleModalChange(e) {
    setsuccessOpen(false);
  }

  async function submitPhase(e) {
    e.preventDefault();
    var phaseNumber = parseInt(selectValue);
    console.log('this is the dropdown ' + selectValue);
    try {
      // make an update call to the smart contract
      window.contract.setPhase({
        // pass the value that the user entered in the greeting field
        phase: phaseNumber,
      });
    } catch (e) {
      alert(
        'Something went wrong! ' +
          'Maybe you need to sign out and back in? ' +
          'Check your browser console for more info.'
      );
      throw e;
    } finally {
      var temp = { phase: selectValue, phasenumber: 0 };
      setphase(selectValue);
      // console.log(phases)
      // console.log("PHASE added")
      setsuccessOpen(true);
    }
    // console.log("here is the phaselist")
    // console.log("this is phase length from submitcandidate" + phases.length)
  }
  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <Router>
          <Navbar />
          <ConnectionCheck />
        </Router>
      </>
    );
  }
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        // window.contract is set by initContract in index.js
        window.contract.getPhase({}).then((candidateFromContract) => {
          console.log(candidateFromContract);
          setphase(candidateFromContract);
        });
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  );
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='' element={<Landing />} />
          <Route path='/profile' element={<VoterProfile />} />
          <Route
            path='admin/register'
            element={
              phases == 1 ? <CandidateRegistration /> : <NoVoterRegistration />
            }
          />
          <Route
            path='register'
            element={
              phases == 1 ? <VoterRegistration /> : <NoVoterRegistration />
            }
          />
          <Route
            path='results'
            element={phases == 3 ? <ResultsPage /> : <NoResultsPage />}
          />
          <Route
            path='vote'
            element={phases == 2 ? <VotingPage /> : <NoVotingPage />}
          />
          <Route
            path='admin'
            element={
              <AdminPage
                phases={phases}
                setphase={setphase.bind(this)}
                selectValue={selectValue}
                submit={submitPhase.bind(this)}
                handleChange={handleChange.bind(this)}
                successOpen={successOpen}
                setssucessOpen={() => setsuccessOpen(false)}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
