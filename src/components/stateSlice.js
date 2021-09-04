import { createSlice } from '@reduxjs/toolkit';
import Deck from './deck';

export let deckInstance = new Deck();
const initialState = {
    // deckInstance: new Deck(),
    deckArray: [...deckInstance.getDeck()],
    hand: { handP1: [], handP2: [], handH: [] },
    bank: 900,
    pot: 100,
    pot2: 0,
    pArray: [100],
    gameStatus: {
        deal: false,
        split: false,
        hand: 0,
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
            state.bank = action.payload;   
        },
        updatePot: (state, action) => {
            state.pot = action.payload;   
        },
        updatePot2: (state, action) => {
            state.pot2 = action.payload;   
        },
        updatePArray: (state, action) => {
            state.pArray = action.payload;
        },
        updateStatus: (state, action) => {
            state.gameStatus = action.payload;
        },
        updateSplit: (state, action) => {
            state.hand = action.payload[0];
            state.bank = action.payload[1];
            state.pot2 = action.payload[2];
            state.pArray = action.payload[3];
            state.gameStatus.split = true;
        },
        updateHand: (state, action) => {
            state.hand = action.payload;
        },
        flipCard: (state, action) => {
            state.hand.handH[0].faceUp = true;
        },
        resetState: (state, action) => {
            state = initialState;
        }
    }
});

export const { updateDeckArray, dealHand, updateBank, updatePArray, updateStatus, updateSplit, updateHand, updatePot, updatePot2, resetState, flipCard } = stateSlice.actions;

export default stateSlice.reducer;