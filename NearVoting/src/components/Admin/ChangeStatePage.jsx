import React from 'react';

function ChangeStatePage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Change State Page </h1>
      <form action="action_page.php">
      <select name="selectList" id="selectList" >
      <option value="0">Select the phase</option>
      <option value="Registration Phase">Registration Phase</option>
      <option value="Voting Phase">Voting Phase</option>
      <option value="Result Phase">Result Phase</option>
    
      </select>
      <div><input type="submit" value="Submit" class="myButton" style={{ textAlign: 'center', marginTop:15 }}></input></div>
      
      </form>      
    </div>
  );
}

export default ChangeStatePage;
