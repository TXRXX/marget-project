import React from 'react';
import './Card.css';

const Card = ({ shop }) => {
  return (
    <div className='card'>
      <img src={shop.imageUrl} alt="" class="card-img" />
      <div class="card-wrapper">
        <div class="card-title">{shop.name}</div>
        <div class="card-desc">{shop.description}</div>
        <div class="card-contact">{shop.contact}</div>
      </div>
    </div>
  );
};

export default Card;
