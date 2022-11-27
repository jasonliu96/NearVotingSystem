import React from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import { Card, List, ListItemText } from '@mui/material';
import { login, logout } from '../../utils';
import { compressOid, decompressOids } from '../../utils';
import constants from '../../constants';
function ResultsPage() {
  const serverUrl = constants.SERVER_URL;
  const [numVotes, setNumVotes] = React.useState(0);
  const [candidates, setCandidates] = React.useState([]);
  const [selected, setSelected] = React.useState(0);
  const [data, setData] = React.useState([]);
  const colors = ['#50A3A4', '#FCAF38', '#674A40', '#F95335'];
  function mapCandidates(candidates) {
    const temp = candidates
      .filter((value, index) => value.votes > 0)
      .map((value, index) => ({
        title: value.fullName,
        value: value.votes,
        color: colors[index % 10],
      }));
    setData(temp);
    console.log('mapcandidates', temp);
  }
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
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        var oids = [];
        var voteCounter = 0;
        // window.contract is set by initContract in index.js
        window.contract.getCandidateMap({}).then((candidateFromContract) => {
          // setCandidates(candidateFromContract)
          for (const [key, value] of Object.entries(candidateFromContract)) {
            oids.push({ name: decompressOids(key), votes: value });
            voteCounter += value;
          }
          console.log(oids);
          setNumVotes(voteCounter);
          axios
            .post(`${serverUrl}/candidate/getCandidateInfo`, { oids })
            .then((res) => {
              if (res.status == 200) {
                console.log(res);
                setCandidates(res.data);
                mapCandidates(res.data);
              }
            });
        });
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  );

  return (
    <>
      <main>
        <h1>Results</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ padding: 10, width: '60%', height: '60%' }}>
            <PieChart
              animate
              data={data}
              style={{
                fontSize: '5px',
              }}
              lineWidth={80}
              label={({ dataEntry }) => dataEntry.title}
            />
          </div>
          <Card
            sx={{
              border: 1,
              p: 1,
              m: 1,
              maxWidth: 'auto',
              maxHeight: 'auto',
              borderColor: '#ebf5fb',
            }}
          >
            <List>
              <ListItemText>Total Votes: {numVotes}</ListItemText>
              {data.map((value, index) => (
                <div key={index}>
                  <ListItemText>
                    {value.title + ': ' + value.value}
                  </ListItemText>
                </div>
              ))}
            </List>
          </Card>
        </div>
      </main>
    </>
  );
}

export default ResultsPage;
