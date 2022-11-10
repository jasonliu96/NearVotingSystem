import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { login, logout } from '../../utils';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import constants from '../../constants';
import { alignProperty } from '@mui/material/styles/cssUtils';
const Navbar = () => {
  const serverUrl = constants.SERVER_URL;
  const [phases, setphase] = useState(-1);

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {

      window.contract.getPhase({}).then((candidateFromContract) => {
        console.log(candidateFromContract);
        setphase(candidateFromContract);
      });

    }
  }, []);

  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <div className='Navbar'>
          <ul>
            <li>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Home</NavLink>
            </li>
          </ul>
          <div className='LoginNav'>
            <button
              className='link LoginButton'
              style={{ float: 'right' }}
              onClick={login}
            >
              Log In
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="Navbar">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/register"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Add Candidate
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Voter Registration
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vote"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Vote
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/results"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Results
              </NavLink>
            </li>
          </ul>
          <div>
              {phases != -1 ? (
                <div className="center" >
                  {(() => {
                    if (phases == 1) {
                      return <div>Current Phase : Registration</div>;
                    } else if (phases == 2) {
                      return <div>Current Phase : Voting</div>;
                    } else if (phases == 3) {
                      return <div>Current Phase : Results</div>;
                    }
                  })()}
                </div>
              ) : (
                <p>The Voting process will start after selecting the Phase</p>
              )}
            </div>
          <div className="LoginNav">
            <Button className="setiings">
              <NavLink to="/settings">
                <SettingsIcon style={{ color: "white" }} fontSize="medium" />
              </NavLink>
            </Button>
            <button
              className="link LoginButton"
              style={{ float: "right" }}
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </div>
      </>
    );
  }
};
export default Navbar;
