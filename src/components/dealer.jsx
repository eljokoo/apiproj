/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Flex } from '@mantine/core';
import Card from './card';
import useStore from '../store/index';

export default function Dealer(props) {
  const dealerHand = useStore(({ gameSlice }) => gameSlice.dealerHand);

  function dealerCards() {
    if (dealerHand.length > 0 && dealerHand.length < 2) {
      return (
        <Flex
          justify="space-around"
          align="center"
          direction="row"
          wrap="nowrap"
          rowGap="md"
          columnGap="md"
          gap="md"
          className="game-not-started"
        >
          <Card card={dealerHand[0]} back={false} />
          <Card card={{}} back />
        </Flex>

      );
    }

    return (
      <Flex
        justify="space-around"
        align="center"
        direction="row"
        wrap="nowrap"
        rowGap="md"
        columnGap="md"
        gap="md"
        className="game-not-started"
      >
        { dealerHand.map((card) => (
          <Card key={card.code} card={card} back={false} />
        )) }
      </Flex>
    );
  }

  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      className="dealer-hand"
    >
      <h1>DEALER</h1>
      { dealerCards() }
    </Flex>
  );
}
