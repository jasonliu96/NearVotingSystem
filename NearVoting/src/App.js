import React from 'react';
import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import CandidateRegistration from './components/Admin/CandidateRegistration';
import ChangeStatePage from './components/Admin/ChangeStatePage';
import ResultsPage from './components/User/ResultsPage';
import VoterRegistration from './components/User/VoterRegistration';
import OldApp from './OldApp'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<Landing />} />
          <Route path="admin/register" element={<CandidateRegistration/>} />
          <Route path="admin/change" element={<ChangeStatePage/>} />
          <Route path="results" element={<ResultsPage/>} />
          <Route path="register" element={<VoterRegistration/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
