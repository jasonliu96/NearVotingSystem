import React from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from '../../utils';

const Navbar = () => {
  return (
    <>
      <div className="Navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin/register">Add Candidate</Link>
          </li>
          <li>
            <Link to="/admin/change">Change State</Link>
          </li>
          <li>
            <Link to="/register">Voter Registration</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
        </ul>
        <ul>
          <button className="link" style={{ float: 'right' }} onClick={login}>
            Log In
          </button>
          <li>
          <button className="link" style={{ float: 'right' }} onClick={logout}>
            Sign out
          </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
