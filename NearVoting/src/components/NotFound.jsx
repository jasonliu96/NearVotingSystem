import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <main>
        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
          <h1 className='notFound'>404 Error</h1>
          <p>Page Not Found</p>
          <Link to='/'>Go Home</Link>
        </div>
      </main>
    </>
  );
}
