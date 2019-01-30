import React from 'react';
import BookCards from './BookCards';

const RenderBookCards = ({ array }) => {
  return array.map((volumeInfo,idx) => {
    return <BookCards volumeInfo={volumeInfo.volumeInfo} key={idx} />
  })
}

export default RenderBookCards;