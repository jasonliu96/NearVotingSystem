import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login, logout } from '../../utils'
import users from './NonRestrictedUsers'

const Navbar = () => {
  const [isrestricted, setisrestricted] = useState(true)

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      if (users.indexOf(window.walletConnection.getAccountId()) > -1)
        setisrestricted(false)
      else setisrestricted(true)
    }
  }, [])

  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <div className="Navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <div className="LoginNav">
            <button
              className="link LoginButton"
              style={{ float: 'right' }}
              onClick={login}
            >
              Log In
            </button>
          </div>
        </div>
      </>
    )
  } else {
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
            {isrestricted ? null : (
              <li>
                <Link style={{ color: 'red' }} to="/admin/change">
                  Change State
                </Link>
              </li>
            )}
            <li>
              <Link style={{ color: 'red' }} to="/register">
                Voter Registration
              </Link>
            </li>
            <li>
              <Link to="/vote">Vote</Link>
            </li>
            <li>
              <Link to="/results">Results</Link>
            </li>
          </ul>
          <div className="LoginNav">
            <button
              className="link LoginButton"
              style={{ float: 'right' }}
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </div>
      </>
    )
  }
}
export default Navbar
