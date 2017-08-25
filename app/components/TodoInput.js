import React from 'react';
import {connect} from 'react-redux';
import {inputTodo, addTodo} from '../actions';
import PropTypes from 'prop-types';
import styles from '../styles/todoinput.scss';
import {fetchTodosIfNeeded, invalidateTodos} from '../actions';

const mapStateToProps = (state) => {
    return ({
        value: state.inputValue
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        handleChange: (event) => dispatch(inputTodo(event.target.value)),
        handleSubmit: (event, value) => {
            event.preventDefault();
            if (value === '') {
                return;
            }
            dispatch(addTodo(value));
            dispatch(inputTodo(''));
        },
        handleRefresh: (history, prevUrl) => {
            history.push(prevUrl);
            dispatch(invalidateTodos());
            dispatch(fetchTodosIfNeeded());
        }
    });
};

let TodoInput = ({handleChange, value, handleSubmit, handleRefresh, history, prevUrl}) => (

        <form className={styles.form} onSubmit={(event) => handleSubmit(event, value)}>
            <button type="button" onClick={() => handleRefresh(history, prevUrl)}>Refresh</button>
            <input value={value} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>

    );

TodoInput.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleRefresh: PropTypes.func,
    history: PropTypes.object,
    prevUrl: PropTypes.string
};

TodoInput = connect(mapStateToProps, mapDispatchToProps)(TodoInput);

export default TodoInput;
