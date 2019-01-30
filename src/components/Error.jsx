import React from 'react';
import './Error.scss';

const Error = ({ error }) => (
  <div className='error-message'>Error: {error}</div>
)

export default Error;