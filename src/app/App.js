import React from 'react';
import styled from '@emotion/styled';
import { Switch, Route } from 'react-router-dom';

import ChatsPage from '../components/ChatsPage';
import ChatPage from '../components/ChatPage';
import Profile from '../components/Profile';

const Container = styled.div``;

class App extends React.Component {
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

	render() {
		return (
			<Container>
				<Switch>
					<Route exact path='/' component={ChatsPage} />
					<Route path='/chat/:id' component={ChatPage} />
					<Route path='/profile' component={ () => <Profile state={this.state} setFullName={this.setFullName} setUserName={this.setUserName} setBio={this.setBio} />} />
				</Switch>
			</Container>
		);
	}
}

export default App;