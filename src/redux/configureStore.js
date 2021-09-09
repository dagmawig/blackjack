import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { updateBank } from './ActionCreators';
import { Reducer } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, applyMiddleware(thunk)
    )

    return store;
};