import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Card,List, ListItemText} from '@mui/material';

function ResultsPage() {
  const [numVotes, setNumVotes] = React.useState(0)
  const [candidates, setCandidates] = React.useState([])
  const [selected, setSelected] = React.useState(0);
  const [data, setData] = React.useState([])
  const colors = ['#ebf5fb','#d6eaf8','#aed6f1','#85c1e9','#5dade2','#3498db','#b0bec5','#90a4ae','#78909c','#607d8b','#546e7a', '#455a64']
  function mapCandidates(candidates){
    const temp = candidates.filter((value, index) => (value.votes>0)).map((value, index)=>({title:value.name, value:value.votes, color:colors[index%10]}))
    setData(temp)
  }
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
          mapCandidates(candidatesFromContract)
        })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )

  return (
    <>
    <main>
      <h1>Results</h1>
      <div style={{display:'flex', flexDirection:'row'}}>
        <div style={{padding:10, width:'60%', height:'60%'}}>
        <PieChart
        animate
        data={data}
        style={{
          fontSize: '5px',
        }}
        lineWidth={80}
        label={({ dataEntry }) => (dataEntry.title)}
      />
      </div>
      <Card sx={{border: 1, p: 1, m: 1, maxWidth: 'auto', maxHeight:'auto', borderColor:'#ebf5fb'}}>
      <List>
        <ListItemText>Total Votes: {numVotes}</ListItemText>
        {data.map((value, index)=> <ListItemText>{value.title +': '+value.value}</ListItemText>)}
      </List>
      </Card>
      </div>
    </main>
    </>
  );
}

export default ResultsPage;
