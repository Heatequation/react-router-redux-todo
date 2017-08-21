import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import About from './About';
import FilterableTable from '../containers/FilterableTable';

const App = () =>
    <div>
        <h1>Filter table</h1>
        <Switch>
        	<Route exact path="/" component={FilterableTable} />
        	<Route path="/about" component={About} />
        </Switch>
        <footer className={footer}>
            <Link to="/">Filterable Table</Link>
            <Link to="/about">About</Link>
        </footer>
    </div>;

export default App;
