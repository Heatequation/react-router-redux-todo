import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};


const todos = (state = {byId: {}, allIds: [], isFetching: false, didInvalidate: false}, action) => {
    switch(action.type) {
        case types.ADD:
            return {
                byId: {
                    ...(state.byId),
                    [action.todo.id]: action.todo
                },
                allIds: [...state.allIds, action.todo.id]
            };
        case types.UPDATE:
            return {
                byId: {
                    ...(state.byId),
                    [action.todo.id]: action.todo
                },
                allIds: [...state.allIds]
            };
        case types.DELETE:
            const allIdsTmp = state.allIds.slice();
            const index = state.allIds.indexOf(action.id);
            allIdsTmp.splice(index, 1);

            const byIdTmp = Object.assign({}, state.byId);
            delete byIdTmp[action.id];

            return {
                byId: byIdTmp,
                allIds: allIdsTmp
            };
        case types.COMPLETE:
            const todoToChange = state.byId[action.id];
            return {
                byId: {
                    ...(state.byId),
                    [action.id]: {...todoToChange, complete: !todoToChange.complete}
                },
                allIds: [...state.allIds]
            };
        case types.INVALIDATE_TODOS:
            return Object.assign({}, state, {didInvalidate: true});
        case types.START_FETCH_TODOS:
            return Object.assign({}, state, {isFetching: true});
        case types.FINISH_FETCH_TODOS:
            const byId = {};
            const allIds = [];
            action.todos.forEach(t => {
                byId[t.id] = t;
                allIds.push(t.id);
            });
            const newState = {
                byId: byId,
                allIds: allIds,
                isFetching: false,
                didInvalidate: false,
                lastUpdated: Date.now()
            };
            return newState;
        default:
            return state;
    }
};


/*
const todos = (state = [], action) => {
    switch(action.type) {
        case types.ADD:
            return [...state, action.todo];
        default:
            return state;
    }
};
*/

const inputValue = (state = '', action) => {
    switch(action.type) {
        case types.INPUT:
            return action.todo;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    inputValue,
    todos,
    filter,
    routing
});

export default rootReducer;
