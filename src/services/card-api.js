import axios from 'axios';

const decktest = 'ka6vme05uvzj';
const API_URL = 'https://deckofcardsapi.com/api/deck';

export const initializeDeck = async () => {
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

export const shuffleDeck = async (deckID) => {
  const response = await axios.get(`${API_URL}/${deckID}/shuffle`)
    .catch((error) => {
      console.error('Error shuffling deck', error);
      throw error;
    });

  return response.data;
};

export const drawCards = async (deckID, number) => {
  const params = {
    count: number,
  };
  const response = await axios.get(`${API_URL}/${deckID}/draw`, { params });
  return response.data;
};

export const drawCardsTest = async (number) => {
  const params = {
    count: number,
  };
  const response = await axios.get(`${API_URL}/${decktest}/draw`, { params })
    .catch((error) => {
      console.error('Error drawing card', error);
      throw error;
    });
  return response.data;
};
