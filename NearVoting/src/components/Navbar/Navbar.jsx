import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { login, logout } from '../../utils'
import users from './NonRestrictedUsers'
import axios from 'axios'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const serverUrl = 'http://localhost:9999'
  const [isrestricted, setisrestricted] = useState(true)
  const [hasRegistered, sethasRegistered] = useState(false)

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      if (users.indexOf(window.walletConnection.getAccountId()) > -1)
        setisrestricted(false)
      else setisrestricted(true)

      const accountId = window.walletConnection.getAccountId()
      const data = {
        accountId,
      }
      axios.post(`${serverUrl}/voter/getHasRegistered`, data).then((res) => {
        if (res.status == 201) {
          console.log('Voter has already registered successfully')
          sethasRegistered(true)
        } else {
          console.log('Voter hasnt registered yet')
          sethasRegistered(false)
        }
      })
    }
  }, [])

  if (!window.walletConnection.isSignedIn()) {
    return (
      <>
        <div className="Navbar">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Home</NavLink>
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
            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink></li>
          <li> <NavLink to="/admin/register" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Add Candidate</NavLink></li>
          {
          hasRegistered ? null : ( 
          <li> <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : 'inactive')}> Voter Registration </NavLink> </li>
          )}
            <li> <NavLink to="/vote" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Vote</NavLink> </li>
            <li> <NavLink to="/results" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Results</NavLink> </li>
          </ul>
          <div className="LoginNav">
            <button
              className="link LoginButton"
              style={{ float: 'right' }}
              onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </>
    )
  }
}
export default Navbar
