import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from '../../utils';
import axios from 'axios';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  const serverUrl = 'http://localhost:9999';

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
    }
  }, []);

  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <div className='Navbar'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
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
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/admin/register'>Add Candidate</Link>
            </li>
            <li>
              <Link to='/register'>Voter Registration</Link>
            </li>
            <li>
              <Link to='/vote'>Vote</Link>
            </li>
            <li>
              <Link to='/results'>Results</Link>
            </li>
          </ul>
          <div className='LoginNav'>
            <Button>
              <Link to='/settings'>
                <SettingsIcon style={{ color: 'white' }} fontSize='medium' />
              </Link>
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
