import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../styles/viewselectorbar.scss';

const ViewSelectorBar = () => (

		<div className={styles.div}>
            Show: {" "}
			<NavLink activeClassName={styles.selected} to="/todolist/all">all</NavLink>{", "}
            <NavLink activeClassName={styles.selected} to="/todolist/complete">complete</NavLink>{", "}
            <NavLink activeClassName={styles.selected} to="/todolist/open">open</NavLink>
		</div>

	);

export default ViewSelectorBar;
