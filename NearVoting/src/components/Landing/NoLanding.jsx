import React from 'react';
import { login, logout } from '../../utils';
import { Container, Header } from '@mui/material';
import { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import Slider from './Slider';
import Footer from './Footer';

function NoLanding1() {
  if (!window.walletConnection.isSignedIn()) {
    return (
      <Fragment>
        <Card style={{ margin: 0, padding: 0 }}>
          <Slider />
          <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
            <button onClick={login}>Sign in</button>
          </p>
          <Card.Footer style={{ backgroundColor: '#1a125c', color: 'white' }}>
            <Footer />
          </Card.Footer>
          <footer
            style={{
              textAlign: 'center',
              padding: 3,
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
            }}
          ></footer>
        </Card>
      </Fragment>
    );
  }

  return (
    <>
      <main>
        <h1>Candidates</h1>
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Currently in Registration/Results Phase.
        </div>
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          To access the voting feature please wait until the voting phase
          begins.
        </div>
      </main>
    </>
  );
}

export default NoLanding1;
