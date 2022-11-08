import React, {useState, useEffect} from 'react';
import getConfig from '../../config'
import { login, logout } from '../../utils'
import {Typography, Button, Card, Box, List, ListItem, ListItemText, Divider} from '@mui/material'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')
const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')
import axios from 'axios'

function Transactions() {
    const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
    const serverUrl = 'http://localhost:9999'

    const [transactions, setTransactions]= useState([])
    useEffect(()=>{
        if (window.walletConnection.isSignedIn()) {
            const accountId = window.walletConnection.getAccountId()
            const params = {
              userId:accountId,
            }
            axios.get(`${serverUrl}/transaction/getTransactions`, {params}).then((res) => {
              console.log('Getting Transactions')
              console.log(res)
              if (res.status == 200) {
                console.log('Transactions retreived')
                console.log(res.data.transactions)
                setTransactions(res.data.transactions)
              } else {
                console.log('user Not found')
              }
            })
          }
    },[])
  return (
    <div>
        <h2>Transactions</h2>
        <Box sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
                {transactions?.length > 0 ? (
                    <List>
                        <ListItem alignItems="center">
                                <ListItemText primary="Action Type"/>
                                <ListItemText primary="Receipt Hash"/>
                        </ListItem>
                        <Divider/>
                        {transactions.map((value, key)=>{
                            return(
                            <ListItem key={key} alignItems="center">
                                <ListItemText primary={value.actionType}/>
                                <ListItemText primary={value.receiptHash}/>
                            </ListItem>
                            )
                        })}
                </List>
                ):
                <Typography>
                    No Transactions Found
                </Typography>}
        <Divider/>
        <div>
        <Typography>
        For more details visit:  
        </Typography>
        <Typography>
        <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
          {`${urlPrefix}/${window.accountId}`}
        </a>
        </Typography>
        <Typography>
        and search for your receipt hash.
        </Typography>
        </div>
        </Box>
    </div>
  );
}

export default Transactions;