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


const todos = (state = {byId: {}, allIds: []}, action) => {
    switch(action.type) {
        case types.ADD:
            const nextId = Math.max(...state.allIds, 0) + 1;
            const nextTodo = {
                id: nextId,
                text: action.todo,
                complete: false
            };
            return {
                byId: {
                    ...(state.byId),
                    [nextId]: nextTodo
                },
                allIds: [...state.allIds, nextId]
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
