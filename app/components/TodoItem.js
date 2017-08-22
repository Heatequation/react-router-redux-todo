import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleComplete} from '../actions';
import styles from '../styles/todoitem.scss';


const mapDispatchToProps = (dispatch) => ({
    handleChange: (id) => dispatch(toggleComplete(id))
});

let TodoItem = ({todo, handleChange}) => (
    <li className={styles.li}>
        <input type="checkbox" checked={todo.complete} onChange={() => handleChange(todo.id)}/>
        <span>{todo.text}</span>
    </li>
);

TodoItem.propTypes = {
    todo: PropTypes.object,
    handleChange: PropTypes.func
};

TodoItem = connect(null, mapDispatchToProps)(TodoItem);

export default TodoItem;
