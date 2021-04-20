import React from 'react';
import styles from './App.module.css';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import AuthPage from './pages/AuthPage/AuthPage';
import WallPage from './pages/WallPage/WallPage';

function App() {
	return (
		<div className={styles.App}>
			<Switch>
				<Route path="/" exact component={MainPage} />
				<Route path="/auth" component={AuthPage} />
				<Route path="/wall" component={WallPage} />
			</Switch>
		</div>
	);
}

export default App;
