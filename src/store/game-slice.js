import {
  // eslint-disable-next-line no-unused-vars
  drawCards, shuffleDeck, initializeDeck,
} from '../services/card-api';

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

        // await changing states
        await set(({ gameSlice: draftState }) => {
          // add cards to dealer's hand
          draftState.dealerHand.push(...cards.cards);

          // calculate dealer's score
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

      // after all is done, return dealer's score
      return get().gameSlice.dealerScore;
    },
    playerDrawCard: async (number) => {
      try {
        const cards = await drawCards(get().gameSlice.deckID, number);

        // await changing states
        await set(({ gameSlice: draftState }) => {
          // add cards to player's hand
          draftState.playerHand.push(...cards.cards);

          // calculate player's score
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

      // after all is done, return player's score
      return get().gameSlice.playerScore;
    },
    setDeckID: async () => {
      // await setting deck ID
      const newDeck = await initializeDeck();
      // const newDeck = { deck_id: 'wfbxt5bp483b' };
      await set(({ gameSlice: draftState }) => { draftState.deckID = newDeck.deck_id; });
    },
    clearAll: async () => {
      await set(({ gameSlice: draftState }) => {
        draftState.dealerHand = [];
        draftState.playerHand = [];
        draftState.dealerScore = 0;
        draftState.playerScore = 0;
        shuffleDeck(get().gameSlice.deckID);
      });
    },
  };
}
