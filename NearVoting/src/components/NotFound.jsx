import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function NotFound() {
  return (
    <>
      <main>
        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
          <h1 className='notFound'>404 Error</h1>
          <p>Page Not Found</p>
          <Link to='/'>Go Home</Link>
          <Button
            onClick={() => {
              try {
                // make an update call to the smart contract
                window.contract.getInfo({});
              } catch (e) {
                alert(
                  'Something went wrong! ' +
                    'Maybe you need to sign out and back in? ' +
                    'Check your browser console for more info.'
                );
                throw e;
              } finally {
              }
              return null;
            }}
          >
            text
          </Button>
        </div>
      </main>
    </>
  );
}
