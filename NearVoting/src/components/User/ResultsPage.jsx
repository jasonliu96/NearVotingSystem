import React from 'react';
// import { PieChart } from 'react-minimal-pie-chart';

function ResultsPage() {
  const [numVotes, setNumVotes] = React.useState(0)
  const [candidates, setCandidates] = React.useState([])
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {

        // window.contract is set by initContract in index.js
        window.contract.get_num({  })
          .then(votesFromContract => {
            setNumVotes(votesFromContract)
          })
        window.contract.getCandidates({  })
        .then(candidatesFromContract => {
          setCandidates(candidatesFromContract)
        })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )
  return (
    <div>
      <h1>Results</h1>
      <h2>Total Number of Votes: {numVotes}</h2>
      
    </div>
  );
}

export default ResultsPage;
