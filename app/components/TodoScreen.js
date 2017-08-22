import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import ViewSelectorBar from './ViewSelectorBar';
import PropTypes from 'prop-types';


const TodoScreen = ({match}) => (
		<div>
			<TodoInput />
			<TodoList filter={match.params.filter || 'all'}/>
			<ViewSelectorBar />
		</div>
	);

TodoScreen.propTypes = {
    match: PropTypes.object
};

export default TodoScreen;
