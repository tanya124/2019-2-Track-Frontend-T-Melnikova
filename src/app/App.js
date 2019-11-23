import React, { Component } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Body from '../components/Body';

const Container = styled.div``;

class App extends Component {
	constructor(prpos) {
		super(prpos);
		this.state = { 
			mode: 'chats', 
			chatId: 0, 
			title: 'Messenger',
		};
		this.setMessagesMode = this.setMessagesMode.bind(this);
		this.setChatsMode = this.setChatsMode.bind(this);
	}

	setMessagesMode(_chatId, _title) {
		this.setState(() => ({
			mode: 'messages',
			chatId: _chatId,
			title: _title,
		}));
	}

	setChatsMode() {
		this.setState(() => ({
			mode: 'chats',
			title: 'Messenger',
		}));
	}

	render() {
		return (
			<Container>
				<Header state={this.state} setChatsMode={this.setChatsMode} />
				<Body state={this.state} setMessagesMode={this.setMessagesMode} openModal={this.openModal} closeModal={this.closeModal}/>
			</Container>
		);
	}   
}

export default App;