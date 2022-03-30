import React from 'react';
import { Link } from 'react-router-dom';
import { login, logout } from '../../utils';

const Navbar = () => {
  return (
    <>
      <div className="Navbar">w 
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <button className="link" style={{ float: 'right' }} onClick={login}>
            Log In
          </button>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
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
