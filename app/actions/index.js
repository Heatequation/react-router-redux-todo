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

export {filterList, addTodo, inputTodo, toggleComplete};
