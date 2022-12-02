import React, { useState, useEffect } from 'react';
import getConfig from '../../config';
import { login, logout } from '../../utils';
import constants from '../../constants';
import {
  Typography,
  Button,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
const { networkId } = getConfig(process.env.NODE_ENV || 'development');
import axios from 'axios';

function Transactions() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;
  const [transactions, setTransactions] = useState([]);

  const style = {
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 700,
    '& ul': { padding: 0 },
  };
  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      const accountId = window.walletConnection.getAccountId();
      const params = {
        userId: accountId,
      };
      axios
        .get(`${constants.SERVER_URL}/transaction/getTransactions`, { params })
        .then((res) => {
          //console.log('Getting Transactions');
          //console.log(res);
          if (res.status == 200) {
            //console.log('Transactions retreived');
            //console.log(res.data.transactions);
            setTransactions(res.data.transactions);
          } else {
            //console.log('user Not found');
          }
        });
    }
  }, []);
  return (
    <div>
      <h2>Transactions</h2>
      <Box sx={{ width: '100%', maxWidth: 1200, bgcolor: 'background.paper' }}>
        {transactions?.length > 0 ? (
          <List sx={style}>
            <ListItem alignItems='center'>
              <ListItemText primary='Action Type' />
              <ListItemText primary='Receipt Hash' />
            </ListItem>
            <Divider />
            {transactions.map((value, key) => {
              return (
                <ListItem key={key} alignItems='center'>
                  <ListItemText
                    edge='start'
                    tabIndex={-1}
                    primaryTypographyProps={{ style: { fontSize: '1em' } }}
                    primary={value.actionType}
                  />
                  <ListItemText
                    primaryTypographyProps={{
                      style: { fontSize: '1em', textAlign: 'right' },
                    }}
                    primary={value.receiptHash}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography>No Transactions Found</Typography>
        )}
        <Divider />
        <div>
          <Typography>For more details visit:</Typography>
          <Typography>
            <a
              target='_blank'
              rel='noreferrer'
              href={`${urlPrefix}/${window.accountId}`}
            >
              {`${urlPrefix}/${window.accountId}`}
            </a>
          </Typography>
          <Typography>and search for your receipt hash.</Typography>
        </div>
      </Box>
    </div>
  );
}

export default Transactions;
