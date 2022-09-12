import React, {useState,useEffect} from 'react';
import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import NoLanding from './components/Landing/NoLanding';
import Navbar from './components/Navbar/Navbar';
import CandidateRegistration from './components/Admin/CandidateRegistration';
import ChangeStatePage from './components/Admin/ChangeStatePage';
import ResultsPage from './components/User/ResultsPage';
import NoResultsPage from './components/User/NoResultsPage';
import VoterRegistration from './components/User/VoterRegistration';
import NoVoterRegistration from './components/User/NoVoterRegistration';

function App() {

  const [phases,setphase] = useState([]);


  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        
        // window.contract is set by initContract in index.js
        window.contract.getPhases({  })
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
      {phases?.length>0
      ?
      phases.slice(-1).map((value, index)=>(
      <Router key={index}>
        <Navbar />
        <Routes>
          <Route path="" element={value.phase == 2 ? <Landing /> : <NoLanding /> } />
          <Route path="admin/register" element={value.phase == 1 ? <CandidateRegistration/> : <NoVoterRegistration/>} />
          <Route path="admin/change" element={<ChangeStatePage/>} />
          <Route path="register" element={value.phase == 1 ? <VoterRegistration/> : <NoVoterRegistration/>} />          
          <Route path="results" element={ value.phase == 3 ?  <ResultsPage/> : <NoResultsPage/>} />

        </Routes>
      </Router>

))
:
      <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<NoLanding />} />
        <Route path="admin/register" element={<NoVoterRegistration/>} />
        <Route path="admin/change" element={<ChangeStatePage/>} />
        <Route path="register" element={<NoVoterRegistration/>} />          
        <Route path="results" element={<NoResultsPage/>} />

      </Routes>
      </Router>
      }
    </div>
  );
}

export default App;
