import { createSlice } from '@reduxjs/toolkit';
import Deck from './deck';

export let deckInstance = new Deck();
const initialState = {
    // deckInstance: new Deck(),
    deckArray: [...deckInstance.getDeck()],
    hand: { handP1: [], handP2: [], handH: [] },
};

export const stateSlice = createSlice({
    name: 'black',
    initialState,
    reducers: {
        updateDeckArray: (state, action) => {
            state.deckArray = action.payload;
        },
        updateHand: (state, action) => {
            state.hand = action.payload;
            state.deckArray = [...deckInstance.getDeck()]
        }
    }
});

export const { updateDeckArray, updateHand } = stateSlice.actions;

export default stateSlice.reducer;