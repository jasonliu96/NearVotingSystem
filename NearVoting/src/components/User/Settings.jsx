import React from 'react';
import Transactions from './Transactions';

function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Transactions />
      </div>
    </>
  );
}

export default Settings;
