import * as types from './types';

function filterList(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

const addTodo = (todo) => ({
    type: types.ADD,
    todo
});

const inputTodo = (todo) => ({
    type: types.INPUT,
    todo
});

const toggleComplete = (id) => ({
    type: types.COMPLETE,
    id
});

const startFetch = () => ({
    type: types.START_FETCH_TODOS
});

const finishFetch = (todos) => ({
    type: types.FINISH_FETCH_TODOS,
    todos
});


// thunk for async API call

const fetchTodosIfNeeded = (dispatch) => {
    // indicate that request to fetch was given
    dispatch(startFetch());

    // fetch from REST api
    return fetch('http://localhost:3000/api/todos')
        .then(data => data.json())
        .then(data => {
            dispatch(finishFetch(data));
            console.log(data);
            console.log('finished');
        })
    ;

    // indicate that fetch returned with data
};

export {filterList, addTodo, inputTodo, toggleComplete, fetchTodosIfNeeded};
