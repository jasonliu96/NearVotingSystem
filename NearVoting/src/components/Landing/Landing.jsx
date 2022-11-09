import React from 'react';
import axios from 'axios';
import { login, logout } from '../../utils';
import getConfig from '../../config';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../Notification';
import ConfirmationModal from '../ConfirmationModal';
function Landing() {
  const serverUrl = 'http://localhost:9999';
  const [candidates, setCandidates] = React.useState([]);
  const [selectedCandidate, setSelCandidate] = React.useState(0);
  const [showNotification, setShowNotification] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [msg, setMsg] = React.useState('Submitted a Vote');

  return (
    <>
      <main>
        <h1>Landing Page</h1>
        <p> Below are the candidates you can vote for </p>
        <div style={{ width: '100%' }}></div>
      </main>
    </>
  );
}

export default Landing;
