import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import MainPage from './components/MainPage'
import LocationPage from './components/LocationPage'

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}*/

export const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="city/:id" component={LocationPage} />
      </Switch>
    </div>
  )
}

/*class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<div className="app">
				<Switch>
					<Route exact path='/' component={MainPage} />
					<Route path='city/:id' component={LocationPage} />
				</Switch>
			</div>
		);
	}
}*/

// export default App;
