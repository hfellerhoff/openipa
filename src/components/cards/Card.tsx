import React from 'react';

interface Props {}

const Card = (props) => (
  <div className={`bg-gray-50 p-4 mb-2 rounded-md shadow ${props.className}`}>
    {props.children}
  </div>
);

export default Card;
