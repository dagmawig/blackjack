import { createSlice } from '@reduxjs/toolkit';
import Deck from './deck';

export let deckInstance = new Deck();
const initialState = {
    // deckInstance: new Deck(),
    deckArray: [...deckInstance.getDeck()],
    hand: { handP1: [], handP2: [], handH: [] },
    bank: 900,
    pot: 100,
    pArray: [100],
    gameStatus: {
        deal: false,
    }
};

export const stateSlice = createSlice({
    name: 'black',
    initialState,
    reducers: {
        updateDeckArray: (state, action) => {
            state.deckArray = action.payload;
        },
        dealHand: (state, action) => {
            state.hand = {...state.hand, handP1: [action.payload[0], action.payload[2]], handH: [action.payload[1], action.payload[3]] };
            state.deckArray = [...deckInstance.getDeck()];
        },
        updateBank: (state, action) => {
            state.bank = action.payload.bank;
            state.pot = action.payload.pot;
        },
        updatePArray: (state, action) => {
            state.pArray = action.payload;
        },
        updateStatus: (state, action) => {
            state.gameStatus = action.payload;
        }
    }
});

export const { updateDeckArray, dealHand, updateBank, updatePArray, updateStatus } = stateSlice.actions;

export default stateSlice.reducer;