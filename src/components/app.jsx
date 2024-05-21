/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import '@mantine/core/styles.css';
import {
  MantineProvider, Button, Flex, Modal, Text,
} from '@mantine/core';
import '../style.scss';
import Dealer from './dealer';
import Player from './player';
import useStore from '../store/index';

export default function App() {
  // Local states for game status
  const [gameStarted, setGameStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  // Store states and actions
  const dealerScore = useStore(({ gameSlice }) => gameSlice.dealerScore);
  const playerScore = useStore(({ gameSlice }) => gameSlice.playerScore);

  const setDeckID = useStore(({ gameSlice }) => gameSlice.setDeckID);

  const dealerDrawCard = useStore(({ gameSlice }) => gameSlice.dealerDrawCard);
  const playerDrawCard = useStore(({ gameSlice }) => gameSlice.playerDrawCard);
  const clearAll = useStore(({ gameSlice }) => gameSlice.clearAll);

  // function to handle game start and initialize hands
  async function onGameStart() {
    setGameStarted(true);
    setDeckID('wfbxt5bp483b');

    await dealerDrawCard(1);
    await playerDrawCard(2);
  }

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

  // function to restart game
  function onResetGame() {
    setIsOpen(false);
    clearAll();

    // draw initial cards
    dealerDrawCard(1);
    playerDrawCard(2);
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

    // check for win/lose conditions
    if (newScore > 21) {
      setTimeout(() => {
        onGameOver('Dealer');
      }, 1000);
    } else if (newScore === 21) {
      setTimeout(() => {
        onGameOver('Dealer');
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

      value: {
        dealerScore
      }
      <Dealer />

      value: {
        playerScore
        }
      <Player />
      <Button onClick={() => playerHit()}>Hit</Button>
      <Button onClick={() => playerStand()}>Stand</Button>

      <Modal opened={isOpen} withCloseButton={false} title="Game Result">
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
