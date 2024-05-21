/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import '@mantine/core/styles.css';
import {
  MantineProvider, Button, Flex, Modal,
} from '@mantine/core';
import '../style.scss';
import Card from './card';
import useStore from '../store/index';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dealerHand = useStore(({ gameSlice }) => gameSlice.dealerHand);
  const dealerScore = useStore(({ gameSlice }) => gameSlice.dealerScore);
  const playerHand = useStore(({ gameSlice }) => gameSlice.playerHand);
  const setDeckID = useStore(({ gameSlice }) => gameSlice.setDeckID);
  const dealerDrawCard = useStore(({ gameSlice }) => gameSlice.dealerDrawCard);
  const playerDrawCard = useStore(({ gameSlice }) => gameSlice.playerDrawCard);

  function onGameStart() {
    setGameStarted(true);
    setDeckID('wfbxt5bp483b');

    dealerDrawCard(1);
    playerDrawCard(2);

    console.log('Game started', dealerHand);
  }

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

  function gameNotStarted() {
    return (
      <Flex
        justify="space-around"
        align="center"
        direction="column"
        wrap="nowrap"
        rowGap="md"
        columnGap="md"
        gap="md"
        className="game-not-started"
      >
        <h1>Blackjack</h1>
        <Button onClick={() => onGameStart()}>Start Game</Button>
      </Flex>
    );
  }

  function dealerArea() {
    return (
      <Flex
        justify="flex-start"
        align="center"
        direction="column"
        className="dealer-hand"
      >
        <h1>DEALER</h1>
        value: {
          dealerScore
        }
        { dealerCards() }
        <Button onClick={() => dealerDrawCard(1)}>Draw Card</Button>
        <Button onClick={() => console.log(dealerHand)}>Check hand</Button>
      </Flex>

    );
  }

  function playerArea() {
    return (
      <Flex
        justify="flex-start"
        align="center"
        direction="column"
        className="dealer-hand"
      >
        <h1>PLAYER</h1>
        value: {
          playerHand.reduce((acc, card) => {
            let tempValue = card.value;

            if (tempValue === 'KING' || tempValue === 'QUEEN' || tempValue === 'JACK') {
              tempValue = 10;
            } else if (tempValue === 'ACE') {
              tempValue = 11;
            }

            return acc + Number(tempValue);
          }, 0)
          }
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

        <Button onClick={() => playerDrawCard(1)}>Draw Card</Button>
        <Button onClick={() => console.log(dealerHand)}>Check hand</Button>
      </Flex>

    );
  }

  return gameStarted ? (
    <MantineProvider>

      {dealerArea()}
      {playerArea()}

      <Modal opened={isOpen} onClose={() => setIsOpen(false)} title="Game Result">
        <Button fullWidth mt="md">
          PLAY AGAIN
        </Button>
      </Modal>

    </MantineProvider>
  ) : (
    <MantineProvider>

      {gameNotStarted()}

    </MantineProvider>
  );
}
