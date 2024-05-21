import { drawCards, shuffleDeck } from '../services/card-api';

export default function createGameSlice(set, get) {
  return {
    dealerHand: [],
    playerHand: [],
    dealerScore: 0,
    playerScore: 0,
    cardsDealt: 0,
    deckID: '',
    dealerDrawCard: async (number) => {
      try {
        const cards = await drawCards(get().gameSlice.deckID, number);
        await set(({ gameSlice: draftState }) => {
          draftState.dealerHand.push(...cards.cards);
          cards.cards.forEach((card) => {
            let tempValue = card.value;

            if (tempValue === 'KING' || tempValue === 'QUEEN' || tempValue === 'JACK') {
              tempValue = 10;
            } else if (tempValue === 'ACE') {
              tempValue = 11;
            }

            draftState.dealerScore += Number(tempValue);
          });
        }, false, 'game/dealerDrawCard');
      } catch (error) {
        console.log('Error drawing card', error);
        throw error;
      }

      return get().gameSlice.dealerScore;
    },
    playerDrawCard: async (number) => {
      try {
        const cards = await drawCards(get().gameSlice.deckID, number);
        await set(({ gameSlice: draftState }) => {
          draftState.playerHand.push(...cards.cards);
          cards.cards.forEach((card) => {
            let tempValue = card.value;

            if (tempValue === 'KING' || tempValue === 'QUEEN' || tempValue === 'JACK') {
              tempValue = 10;
            } else if (tempValue === 'ACE') {
              tempValue = 11;
            }

            draftState.playerScore += Number(tempValue);
          });
        }, false, 'game/playerDrawCard');
      } catch (error) {
        console.log('Error drawing card', error);
        throw error;
      }

      return get().gameSlice.playerScore;
    },
    setDeckID: async (deckID) => {
      await set(({ gameSlice: draftState }) => { draftState.deckID = deckID; });
      console.log('Deck ID set', deckID);
    },
    clearAll: async () => {
      set(({ gameSlice: draftState }) => {
        draftState.dealerHand = [];
        draftState.playerHand = [];
        draftState.dealerScore = 0;
        draftState.playerScore = 0;
        shuffleDeck(get().gameSlice.deckID);
      });
    },
  };
}
