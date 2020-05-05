import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './styles/globalStyles.css';
import * as serviceWorker from './utils/serviceWorker';

/* ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root'),
); */
ReactDOM.render(
	<App />,
	document.getElementById('root'),
);
// If you want your app to work offline and load fat<>er, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
