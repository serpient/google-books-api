import React from 'react';
import './NoResults.scss';

const NoResults = ({text}) => (
  <div className='no-results-card'><i className='far fa-frown'/>{text}</div>
)

export default NoResults;