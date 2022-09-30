import React from 'react';
import { login, logout } from '../../utils'

function NoLanding() {

  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>Welcome to NearVoting!</h1>
        <p>
          To Make use of this voting application you first need to login!
        </p>
        <p>
          Go ahead and click the button below to try it out:
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }


  return (
    <>
      <main>
        <h1>Candidates</h1>
        <div style={{
          textAlign: 'center', position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>Currently in Registration/Results Phase.</div>
        <div style={{
          textAlign: 'center', position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>To access the voting feature please wait until the voting phase begins.</div>


      </main>
    </>
  );
}

export default NoLanding;
