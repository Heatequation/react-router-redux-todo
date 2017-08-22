import React from 'react';
import {connect} from 'react-redux';
import {inputTodo, addTodo} from '../actions';
import PropTypes from 'prop-types';
import styles from '../styles/todoinput.scss';

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
        }
    });
};

let TodoInput = ({handleChange, value, handleSubmit}) => (

        <form className={styles.form} onSubmit={(event) => handleSubmit(event, value)}>
            <input value={value} onChange={handleChange} />
            <button type="submit">Add</button>
        </form>

    );

TodoInput.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func
};

TodoInput = connect(mapStateToProps, mapDispatchToProps)(TodoInput);

export default TodoInput;
