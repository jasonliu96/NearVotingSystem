import React from 'react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignText: 'center',
  margin: '0px 3px 0px 3px',
};
function Signup() {
  return (
    <div style={style}>
      <h1>Sign Up Page</h1>
      Username
      <input type="text" />
      Password
      <input type="text" />
    </div>
  );
}

export default Signup;
