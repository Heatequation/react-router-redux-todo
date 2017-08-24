import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import About from './About';
import TodoScreen from './TodoScreen';
import styles from '../styles/app.scss';
import '../styles/global.scss';

const App = () =>
    <div className={styles.div}>
        <h1>ToDo App</h1>
        <Switch>
            <Route exact path="/">
                <Redirect to="/todolist/all" />
            </Route>
        	<Route path="/todolist/:filter?" component={TodoScreen} />
            <Route path="/about" component={About} />
        </Switch>
        <footer className={styles.footer}>
            <NavLink activeClassName={styles.selected} to="/todolist/all">ToDo List</NavLink>
            <NavLink activeClassName={styles.selected} to="/about">About</NavLink>
        </footer>
    </div>;

export default App;
