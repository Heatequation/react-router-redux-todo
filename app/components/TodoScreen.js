import React, {Component} from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import ViewSelectorBar from './ViewSelectorBar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchTodosIfNeeded} from '../actions';


class TodoScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchTodosIfNeeded());
    }

    componentDidUpdate() {
        const {dispatch} = this.props;
        dispatch(fetchTodosIfNeeded());
    }

    render() {
        const {history, match} = this.props;

        return (
            <div>
                <TodoInput history={history} prevUrl={match.url}/>
                <TodoList
                    filter={match.params.filter || 'all'}
                    details={this.props.children}
                    match={this.props.match}
                />
                <ViewSelectorBar />
            </div>
        );
    }
}

TodoScreen.propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func,
    children: PropTypes.object,
    history: PropTypes.object
};

export default connect()(TodoScreen);
