import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import OldApp from './OldApp';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path="" element={<OldApp />} />
          <Route path="landing" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
