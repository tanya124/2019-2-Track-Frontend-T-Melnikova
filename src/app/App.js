/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-classes-per-file */
import React from 'react';
import styled from '@emotion/styled';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import store from '../store';
import {auth} from '../actions';

import ChatsPage from '../components/ChatsPage';
import ChatPage from '../components/ChatPage';
import Profile from '../components/Profile';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import WebRTCChatPage from '../components/WebRTC/WebRTCChatPage';

const Container = styled.div``;

class RootContainerComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: 'Kek',
			userName: '@kek',
			bio: '2',
		};
		this.setFullName = this.setFullName.bind(this);
		this.setUserName = this.setUserName.bind(this);
		this.setBio = this.setBio.bind(this);
	}

	componentDidMount() {
		/* (async () => {
			await fetch('http://127.0.0.1:8000/login/', {
				method: 'GET'
				
			})
				.then((resp) => resp.text())
				.then((data) => {
					console.log(data);
				});
		})(); */
		this.props.loadUser();
	}

	setFullName(name) {
		this.setState(() => ({
			fullName: name,
		}));
	}

	setUserName(name) {
		this.setState(() => ({
			userName: name,
		}));
	}

	setBio(text){
		this.setState(() => ({
			bio: text,
		}));
	}

	PrivateRoute = ({component: ChildComponent, ...rest}) => {
		return <Route {...rest} render={props => {
			if (this.props.auth.isLoading) {
				return <em>Loading...</em>;
			} if (!this.props.auth.isAuthenticated) {
				return <Redirect to="/login" />;
			} 
			return <ChildComponent {...props} />;
			
		}} />;
	}

	render() {
		const { PrivateRoute } = this;
		return (
			<Container>
				<BrowserRouter>
					<Switch>
						<PrivateRoute exact path='/2019-2-Track-Frontend-T-Melnikova/' component={ChatsPage} />
						<Route path='/2019-2-Track-Frontend-T-Melnikova/chat/:id' component={ChatPage} />
						<Route path='/2019-2-Track-Frontend-T-Melnikova/profile' component={ () => <Profile state={this.state} setFullName={this.setFullName} setUserName={this.setUserName} setBio={this.setBio} />} />
						<Route exact path='/login' component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path='/webrtc' component={WebRTCChatPage} />
					</Switch>
				</BrowserRouter>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		loadUser: () => {
			return dispatch(auth.loadUser());
		}
	};
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);


class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<RootContainer />
			</Provider>
		);
	}
};



export default App;