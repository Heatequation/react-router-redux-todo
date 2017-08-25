import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleComplete} from '../actions';
import styles from '../styles/todoitem.scss';
import {NavLink, Route} from 'react-router-dom';
import TodoDetails from './TodoDetails';


const mapDispatchToProps = (dispatch) => ({
    handleChange: (id) => dispatch(toggleComplete(id))
});

class TodoItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {todo, match, handleChange} = this.props;

        return (
            <li className={styles.li}>
                <input type="checkbox" checked={todo.complete} onChange={() => handleChange(todo.id)}/>
                <NavLink
                    activeClassName={styles.selected}
                    to={match.url + '/todo/' + todo.id}>{todo.text}
                </NavLink>
                <Route exact path={match.url + '/todo/' + todo.id} render={
                    ({history}) => {
                        return <TodoDetails todo={todo} history={history} prevUrl={match.url} />;
                    }
                } />
            </li>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object,
    handleChange: PropTypes.func,
    details: PropTypes.object,
    match: PropTypes.object
};

TodoItem = connect(null, mapDispatchToProps)(TodoItem);

export default TodoItem;
