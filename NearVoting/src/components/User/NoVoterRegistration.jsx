import React from 'react';
import { login, logout } from '../../utils';

function NoVoterRegistration() {
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>Welcome to NearVoting!</h1>
        <p>To Make use of this voting application you first need to login!</p>
        <p>Go ahead and click the button below to try it out:</p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    );
  }

  return (
    <>
      <main>
        <h1>Register!</h1>
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          It is not the correct Phase.
        </div>
      </main>
    </>
  );
}

export default NoVoterRegistration;
