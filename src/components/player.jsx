/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Flex } from '@mantine/core';
import Card from './card';
import useStore from '../store/index';

export default function Player() {
  const playerHand = useStore(({ gameSlice }) => gameSlice.playerHand);

  // if player has no cards, just display two cards turned down
  if (playerHand.length === 0) {
    return (
      <Flex
        justify="flex-start"
        align="center"
        direction="column"
        className="player-hand"
      >
        <h1>PLAYER</h1>
        <Flex
          justify="space-around"
          align="center"
          direction="row"
          wrap="wrap"
          rowGap="md"
          columnGap="md"
          gap="md"
          className="player-cards"
        >
          <Card card={{}} back />
          <Card card={{}} back />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      className="player-hand"
    >
      <h1>PLAYER</h1>
      <Flex
        justify="space-around"
        align="center"
        direction="row"
        wrap="wrap"
        rowGap="md"
        columnGap="md"
        gap="md"
        className="player-cards"
      >
        {playerHand.map((card) => (
          <Card key={card.code} card={card} back={false} />
        ))}
      </Flex>
    </Flex>

  );
}
