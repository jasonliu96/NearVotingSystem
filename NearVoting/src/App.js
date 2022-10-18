import React, { useState, useEffect } from 'react';
import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import NoLanding from './components/Landing/NoLanding';
import Landing1 from './components/Landing/Landing1';
import NoLanding1 from './components/Landing/NoLanding1';
import Navbar from './components/Navbar/Navbar';
import CandidateRegistration from './components/Admin/CandidateRegistration';
import ChangeStatePage from './components/Admin/ChangeStatePage';
import ResultsPage from './components/User/ResultsPage';
import NoResultsPage from './components/User/NoResultsPage';
import VoterRegistration from './components/User/VoterRegistration';
import NoVoterRegistration from './components/User/NoVoterRegistration';

function App() {

  const [phases, setphase] = useState([]);
  const [selectValue, setselectvalue] = useState('');
  const [successOpen, setsuccessOpen] = React.useState(false)  
  async function handleChange(e) {
    setselectvalue(e.target.value);
    console.log("this is the dropdown " + e.target.value)
  }
  async function handleModalChange(e) {
    setsuccessOpen(false);
  }
  async function submitPhase(e) {
    e.preventDefault()
    console.log("this is the dropdown " + selectValue)
    try {
      // make an update call to the smart contract
      window.contract.addstate({
        // pass the value that the user entered in the greeting field
        text: selectValue
      })
    } catch (e) {
      alert(
        'Something went wrong! ' +
        'Maybe you need to sign out and back in? ' +
        'Check your browser console for more info.'
      )
      throw e
    } finally {
      var temp = { 'phase': selectValue, 'phasenumber': 0 }
      setphase([...phases, temp])
      // console.log(phases)
      // console.log("PHASE added")
      setsuccessOpen(true)
    }
    // console.log("here is the phaselist")
    // console.log("this is phase length from submitcandidate" + phases.length)
  }

  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {

        // window.contract is set by initContract in index.js
        window.contract.getPhases({})
          .then(candidateFromContract => {
            console.log(candidateFromContract)
            setphase(candidateFromContract)

          })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )

  return (
    <div className="App">
      {phases?.length > 0
        ?
        phases.slice(-1).map((value, index) => (
          <Router key={index}>
            <Navbar />
            <Routes>
              <Route path="" element={value.phase == 2 ? <Landing1 /> : <NoLanding1 />} />
              <Route path="admin/register" element={value.phase == 1 ? <CandidateRegistration /> : <NoVoterRegistration />} />
              <Route path="admin/change" element={<ChangeStatePage phases={phases} 
               selectValue={selectValue} 
              submit={submitPhase.bind(this)} handleChange={handleChange.bind(this)} 
              successOpen={successOpen} handleModalChange={handleModalChange.bind(this)}/>} />
              <Route path="register" element={value.phase == 1 ? <VoterRegistration /> : <NoVoterRegistration />} />
              <Route path="results" element={value.phase == 3 ? <ResultsPage /> : <NoResultsPage />} />

            </Routes>
          </Router>

        ))
        :
        <Router>
          <Navbar />
          <Routes>
            <Route path="" element={<NoLanding1 />} />
            <Route path="admin/register" element={<NoVoterRegistration />} />
            <Route path="admin/change" element={<ChangeStatePage phases={phases} setphase={setphase.bind(this)} selectValue={selectValue} submit={submitPhase.bind(this)} handleChange={handleChange.bind(this)} successOpen={successOpen} setssucessOpen={()=>setsuccessOpen(false)}/>} />
            <Route path="register" element={<NoVoterRegistration />} />
            <Route path="results" element={<NoResultsPage />} />

          </Routes>
        </Router>
      }
    </div>
  );
}

export default App;
