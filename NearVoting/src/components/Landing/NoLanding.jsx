import React from 'react';
import { login, logout } from '../../utils';
import { Container, Header } from '@mui/material';
import { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import Slider from './Slider';
import Footer from './Footer';

function NoLanding() {
  return (
    <>
      <Fragment>
        <Card style={{ margin: 0, padding: 0 }}>
          <Slider />
          {/* <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
            <button onClick={login}>Sign in</button>
          </p> */}
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
    </>
  );
}

export default NoLanding;
