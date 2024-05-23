/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import '@mantine/core/styles.css';
import {
  MantineProvider, Button, Flex, Modal, Text, Blockquote,
} from '@mantine/core';
import '../style.scss';
import Dealer from './dealer';
import Player from './player';
import useStore from '../store/index';
import getNumberFact from '../services/number-facts-api';

export default function App() {
  // Local states for game status
  const [gameStarted, setGameStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [numberFact, setNumberFact] = useState('No number fact yet!');

  // Store states and actions
  const dealerScore = useStore(({ gameSlice }) => gameSlice.dealerScore);
  const playerScore = useStore(({ gameSlice }) => gameSlice.playerScore);

  const setDeckID = useStore(({ gameSlice }) => gameSlice.setDeckID);

  const dealerDrawCard = useStore(({ gameSlice }) => gameSlice.dealerDrawCard);
  const playerDrawCard = useStore(({ gameSlice }) => gameSlice.playerDrawCard);
  const clearAll = useStore(({ gameSlice }) => gameSlice.clearAll);

  // function to handle game over and display result
  function onGameOver(winner) {
    setIsOpen(true);

    // set win message
    if (winner === 'Player') {
      setWinMessage('You Win!');
    } else if (winner === 'Dealer') {
      setWinMessage('Dealer Wins!');
    } else {
      setWinMessage('Draw!');
    }
  }

  // function to handle game start and initialize hands
  async function onGameStart() {
    setGameStarted(true);
    await setDeckID();

    const dealerInitial = await dealerDrawCard(1);
    const playerInitial = await playerDrawCard(2);

    const fact = await getNumberFact(playerInitial);

    setNumberFact(fact.text);

    if (dealerInitial === 21) {
      onGameOver('Dealer');
    }
    if (playerInitial === 21) {
      onGameOver('Player');
    }
  }

  // function to restart game
  async function onResetGame() {
    setIsOpen(false);
    await clearAll();

    // draw initial cards
    const dealerInitial = await dealerDrawCard(1);
    const playerInitial = await playerDrawCard(2);

    const fact = await getNumberFact(playerInitial);

    setNumberFact(fact.text);

    if (dealerInitial === 21) {
      onGameOver('Dealer');
    }
    if (playerInitial === 21) {
      onGameOver('Player');
    }
  }

  // function to display game not started screen
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

  // function to handle player hit action, and check for win/lose conditions
  async function playerHit() {
    const newScore = await playerDrawCard(1);

    const fact = await getNumberFact(newScore);

    setNumberFact(fact.text);

    // check for win/lose conditions
    if (newScore > 21) {
      setTimeout(() => {
        onGameOver('Dealer');
      }, 1000);
    } else if (newScore === 21) {
      setTimeout(() => {
        onGameOver('Player');
      }, 1000);
    }
  }

  // function to handle player stand action, and let dealer play, checking for win/lose conditions
  async function playerStand() {
    let newScore = dealerScore;

    // while dealer has not surpassed 21, keep drawing
    while (newScore < 21) {
      // eslint-disable-next-line no-await-in-loop
      newScore = await dealerDrawCard(1);

      // check for win/lose conditions
      if (newScore > 21) {
        setTimeout(() => {
          onGameOver('Player');
        }, 1000);
        break;
      } else if (newScore > playerScore) {
        setTimeout(() => {
          onGameOver('Dealer');
        }, 1000);
        break;
      } else if (newScore === 21) {
        setTimeout(() => {
          onGameOver();
        }, 1000);
        break;
      }

      // inspired by https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => { setTimeout(resolve, 500); });
    }
  }
  return gameStarted ? (
    <MantineProvider>
      <Flex justify="center" align="center" direction="column">
        <Dealer />
        <Text mt="md" size="30px" align="center">{dealerScore}</Text>
        <Blockquote className="math-fact" color="blue" cite="– Math" mt="md" mb="md">
          {numberFact}
        </Blockquote>
        <Text mt="md" size="30px" align="center">{playerScore}</Text>
        <Flex justify="center" align="center" direction="row" wrap="nowrap" gap="xl">
          <Button size="lg" radius="lg" onClick={() => playerHit()}>Hit</Button>
          <Player />
          <Button size="lg" radius="lg" onClick={() => playerStand()}>Stand</Button>
        </Flex>
      </Flex>

      <Modal opened={isOpen} withCloseButton={false} onClose={() => {}} title="Game Result">
        <Text align="center">{winMessage}</Text>
        <Button fullWidth mt="md" onClick={() => onResetGame()}>
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
