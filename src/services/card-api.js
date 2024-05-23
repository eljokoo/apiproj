import axios from 'axios';

// const decktest = 'ka6vme05uvzj';
const API_URL = 'https://deckofcardsapi.com/api/deck';

// function to initialize a deck (or decks)
export const initializeDeck = async () => {
  // use 6 decks
  const params = {
    deck_count: 6,
  };

  const response = await axios.get(`${API_URL}/new/shuffle`, { params })
    .catch((error) => {
      console.error('Error initializing deck', error);
      throw error;
    });

  return response.data;
};

// function to shuffle a deck
export const shuffleDeck = async (deckID) => {
  // only shuffle remaining cards!
  const params = {
    remaining: true,
  };

  const response = await axios.get(`${API_URL}/${deckID}/shuffle`, { params })
    .catch((error) => {
      console.error('Error shuffling deck', error);
      throw error;
    });

  return response.data;
};

// function to draw a number of cards from a deck
export const drawCards = async (deckID, number) => {
  const params = {
    count: number,
  };
  const response = await axios.get(`${API_URL}/${deckID}/draw`, { params });
  return response.data;
};

// get a deck based on id (currently unused but may be useful if changes are made in future)
export const getDeck = async (deckID) => {
  const response = await axios.get(`${API_URL}/${deckID}`);
  return response.data;
};
