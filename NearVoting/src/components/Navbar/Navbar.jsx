import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login, logout } from '../../utils'
import users from './NonRestrictedUsers'
import axios from 'axios'

const Navbar = () => {
  const serverUrl = 'http://localhost:9999'
  const [isrestricted, setisrestricted] = useState(true)
  // const [hasRegistered, sethasRegistered] = useState(false)

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      if (users.indexOf(window.walletConnection.getAccountId()) > -1)
        setisrestricted(false)
      else setisrestricted(true)

      // const accountId = window.walletConnection.getAccountId()
      // const data = {
      //   accountId,
      // }
      // axios.post(`${serverUrl}/voter/getHasRegistered`, data).then((res) => {
      //   if (res.status == 201) {
      //     console.log('Voter has already registered successfully')
      //     sethasRegistered(true)
      //   } else {
      //     console.log('Voter hasnt registered yet')
      //     sethasRegistered(false)
      //   }
      // })
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
            {/* {hasRegistered ? null : ( */}
            <li>
              <Link style={{ color: 'red' }} to="/register">
                Voter Registration
              </Link>
            </li>
            {/* )} */}
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
