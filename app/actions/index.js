import * as types from './types';
import {Promise} from 'es6-promise';

function filterList(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

const addStateTodo = (todo) => ({
    type: types.ADD,
    todo
});

const updateTodo = (todo) => ({
    type: types.UPDATE,
    todo
});

const deleteTodo = (id) => ({
    type: types.DELETE,
    id
});

const inputTodo = (todo) => ({
    type: types.INPUT,
    todo
});

const invalidateTodos = () => {
    return {type: types.INVALIDATE_TODOS};
};

const startFetch = () => ({
    type: types.START_FETCH_TODOS
});

const finishFetch = (todos) => ({
    type: types.FINISH_FETCH_TODOS,
    todos
});

const errorFetch = (error) => ({
    type: types.ERROR_FETCH_TODOS,
    error
});


// thunk for async API call


const shouldFetchPosts = (state) => {
    const todos = state.todos;
    if (todos.allIds.length === 0) {
        return true;
    } else if (todos.isFetching) {
        return false;
    }
    return todos.didInvalidate;
};


const fetchTodosIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState())) {
            // fetch from REST api
            dispatch(startFetch());
            return fetch('http://localhost:3000/api/todos', {method: 'GET'})
                .then(data => data.json(),  error => console.log('An error occured.', error))
                .then(data => dispatch(finishFetch(data)))
            ;
        }
        return Promise.resolve();
    };
};

const toggleComplete = (id) => {
    return (dispatch, getState) => {
        const todoToChange = getState().todos.byId[id];
        todoToChange.complete = !todoToChange.complete;
        const options = {
            method: 'PUT',
            body: JSON.stringify(todoToChange),
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:3000/api/todos/' + id, options)
            .then(data => data.json(), error => console.log('An error occured.', error))
            .then(data => {
                console.log('dispatching');
                dispatch(updateTodo(data));
            });
    };
};

const requestUpdateTodo = (todo, dispatch) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {'Content-Type': 'application/json'}
    };
    return fetch('http://localhost:3000/api/todos/' + todo.id, options)
        .then(data => data.json(), error => console.log('An error occured.', error))
        .then(data => {
            console.log('dispatching');
            dispatch(updateTodo(data));
        });
};

const requestDeleteTodo = (id) => {
    const options = {
        method: 'DELETE'
    };
    return (dispatch) => {
        return fetch('http://localhost:3000/api/todos/' + id, options)
            .then(data => data.json(), error => console.log('An error occured.', error))
            .then(data => {
                console.log('data', data);
                dispatch(deleteTodo(id));
            });
    };
};

const addTodo = (text) => {
    return (dispatch, getState) => {
        const state = getState();
        console.log(state);
        const nextId = Math.max(...state.todos.allIds, 0) + 1;
        const nextTodo = {
            id: nextId,
            text: text,
            complete: false
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(nextTodo),
            headers: {'Content-Type': 'application/json'}
        };
        /* dispatch(addStateTodo(nextTodo)); */
        return fetch('http://localhost:3000/api/todos/', options)
            .then(data => data.json(), error => console.log('An error occured.', error))
            .then(data => {
                console.log('dispatching add');
                dispatch(addStateTodo(data));
            });
    };
};

export {
    filterList, addTodo, inputTodo, toggleComplete, invalidateTodos, addStateTodo,
    startFetch, errorFetch, fetchTodosIfNeeded, updateTodo, requestUpdateTodo, deleteTodo,
    requestDeleteTodo
};
