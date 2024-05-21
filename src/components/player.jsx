/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Flex } from '@mantine/core';
import Card from './card';
import useStore from '../store/index';

export default function Player() {
  const playerHand = useStore(({ gameSlice }) => gameSlice.playerHand);

  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      className="dealer-hand"
    >
      <h1>PLAYER</h1>
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
        {playerHand.map((card) => (
          <Card key={card.code} card={card} back={false} />
        ))}
      </Flex>
    </Flex>

  );
}
