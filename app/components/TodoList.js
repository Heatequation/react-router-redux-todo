import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import styles from '../styles/todolist.scss';


const mapStateToProps = (state, ownProps) => {
    const todos = Object.values(state.todos.byId);
    let filteredTodos = [];
    switch(ownProps.filter) {
        case 'complete':
            filteredTodos = todos.filter(t => t.complete);
            break;
        case 'open':
            filteredTodos = todos.filter(t => !t.complete);
            break;
        default:
            filteredTodos = todos;
    }
    return {filteredTodos};
};

let TodoList = ({filteredTodos}) => (

        <ul className={styles.ul}>
            {filteredTodos.map(t => <TodoItem key={t.id} todo={t} />)}
        </ul>
    );

TodoList.propTypes = {
    filteredTodos: PropTypes.array
};

TodoList = connect(mapStateToProps)(TodoList);

export default TodoList;
