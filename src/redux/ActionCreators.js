import * as ActionTypes from './ActionTypes';

export const updateNewBank = (bank) => ({
    type: ActionTypes.UPDATE_BANK,
    payload: bank
});