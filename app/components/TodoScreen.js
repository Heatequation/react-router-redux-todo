import React, {Component} from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import ViewSelectorBar from './ViewSelectorBar';
import PropTypes from 'prop-types';


class TodoScreen extends Component {

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div>
                <TodoInput />
                <TodoList filter={this.props.match.params.filter || 'all'}/>
                <ViewSelectorBar />
            </div>
        );
    }
}

TodoScreen.propTypes = {
    match: PropTypes.object
};

export default TodoScreen;
