import React from 'react';
import Gravatar from 'react-gravatar';

function generateRandomEmail(username) {
  const domain = 'example.com'; // Use a fixed domain for all emails
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${username}-${randomPart}@${domain}`;
}

function Client({ username }) {
  const email = generateRandomEmail(username);

  return (
    <div className="d-flex align-items-center mb-3">
      <Gravatar email={email} size={40} className="mr-3 rounded-3" /> 
      <span className='mx-2'>{username}</span>
    </div>
  );
}

export default Client;
