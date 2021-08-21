import { createSlice } from '@reduxjs/toolkit';
import Deck from './deck';

export let deckInstance = new Deck();
const initialState = {
    // deckInstance: new Deck(),
    deckArray: [...deckInstance.getDeck()],
    pot: { pot0: [], pot1: [] },
};

export const stateSlice = createSlice({
    name: 'black',
    initialState,
    reducers: {
        updateDeckArray: (state, action) => {
            state.deckArray = action.payload;
        },
        updatePot: (state, action) => {
            state.pot = action.payload;
        }
    }
});

export const { updateDeckArray, updatePot } = stateSlice.actions;

export default stateSlice.reducer;