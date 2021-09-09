import * as ActionTypes from './ActionTypes';

export const Reducer = (state = {
    newBank: 0
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_BANK:
            return {...state, newBank: action.payload}
        default:
            return state;
    }
}