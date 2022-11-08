import React, {useState, useEffect} from 'react';
import getConfig from '../../config'
import { login, logout } from '../../utils'
import {Typography, Button} from '@mui/material'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')
const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')
import axios from 'axios'
import Transactions from './Transactions'
function Settings() {

  return (
    <>
      <main>
        <h1>Settings</h1>
        <Transactions/>
      </main>
    </>
  );
}

export default Settings;