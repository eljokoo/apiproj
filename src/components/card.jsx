/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

const BACK_OF_CARD = 'https://deckofcardsapi.com/static/img/back.png';

export default function Card(props) {
  // const card = {
  //   code: '8S',
  //   image: 'https://deckofcardsapi.com/static/img/8S.png',
  //   images: {
  //     svg: 'https://deckofcardsapi.com/static/img/8S.svg',
  //     png: 'https://deckofcardsapi.com/static/img/8S.png',
  //   },
  //   value: '8',
  //   suit: 'SPADES',
  // };

  function cardImage() {
    if (props.back) {
      return (
        <img src={BACK_OF_CARD} alt="Back of card" className="card-image" />
      );
    }

    return (
      <img src={props.card.image} alt={`${props.card.value} of ${props.card.suit}`} className="card-image" />
    );
  }

  return (
    <div className="card">
      { cardImage() }
    </div>
  );
}
