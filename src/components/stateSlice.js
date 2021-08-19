import { createSlice } from '@reduxjs/toolkit';
import Deck from './deck';

// let deckInstance = new Deck();
const initialState = {
    // deckInstance: new Deck(),
    deckArray: [],
    pot: { pot0: [], pot1: [] },
};

export const stateSlice = createSlice({
    name: 'black',
    initialState,
    reducers: {
        addDeck: (state, action) => {
            state.deckInstance = action.payload;
        },
        updateDeckArray: (state, action) => {
            state.deckArray = action.payload;
        },
        updatePot: (state, action) => {
            state.pot = action.payload;
        }
    }
});

export const { addDeck, updateDeckArray, updatePot } = stateSlice.actions;

export default stateSlice.reducer;