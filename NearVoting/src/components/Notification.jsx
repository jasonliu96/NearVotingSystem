import getConfig from '../config';
import React from 'react';
const { networkId } = getConfig(process.env.NODE_ENV || 'development');

// this component gets rendered by App after the form is submitted
export default function Notification({ method }) {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`;
  return (
    <aside>
      <a
        target='_blank'
        rel='noreferrer'
        href={`${urlPrefix}/${window.accountId}`}
      >
        {window.accountId}
      </a>
      {
        ' ' /* React trims whitespace around tags; insert literal space character when needed */
      }
      User has {method} to the Contract:{' '}
      <a
        target='_blank'
        rel='noreferrer'
        href={`${urlPrefix}/${window.contract.contractId}`}
      >
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}
