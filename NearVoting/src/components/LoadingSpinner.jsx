import getConfig from '../config';
import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

// this component gets rendered by App after the form is submitted
export default function LoadingSpinner({ loading }) {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        open={loading}
      >
        <CircularProgress color='inherit' />
        <Typography>
          Please note refreshing the page will cancel progress.
        </Typography>
      </Backdrop>
    </div>
  );
}
