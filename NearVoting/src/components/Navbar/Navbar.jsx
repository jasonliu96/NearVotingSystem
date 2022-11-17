import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { login, logout } from '../../utils';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import constants from '../../constants';
import { alignProperty } from '@mui/material/styles/cssUtils';
const Navbar = (props) => {
  const serverUrl = constants.SERVER_URL;
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    setPhase(props.phase);
  }, [props.phase]);
  const renderSwitch = (phase) => {
    switch (phase) {
      case 1:
        return <div className='center'>Current Phase : Registration</div>;
      case 2:
        return <div className='center'>Current Phase : Voting</div>;
      case 3:
        return <div className='center'>Current Phase : Results</div>;
      default:
        return <div className='center'>Current Phase : Loading</div>;
    }
  };
  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <div className='Navbar'>
          <ul>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                Home
              </NavLink>
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
        <div className='Navbar'>
          <ul>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/candidate/register'
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                Candidate Registration
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/voter/register'
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                Voter Registration
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/vote'
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                Vote
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/results'
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                Results
              </NavLink>
            </li>
          </ul>
          <div key={phase}>{renderSwitch(phase)}</div>
          <div className='LoginNav'>
            <Button>
              <NavLink to='/settings'>
                <SettingsIcon style={{ color: 'white' }} fontSize='medium' />
              </NavLink>
            </Button>
            <button
              className='link LoginButton'
              style={{ float: 'right' }}
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
