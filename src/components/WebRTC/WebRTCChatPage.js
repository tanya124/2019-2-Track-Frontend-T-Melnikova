/* eslint-disable react/no-unused-state */
import React from 'react';
import Peer from 'peerjs';
import styled from '@emotion/styled';

import FormInput from '../FormInput';
import HeaderChat from '../HeaderChat';
// import MessageBlock from '../MessageList';

import '../../styles/MessageListStyles.css';


const Result = styled.div`
  display: flex;
  color: rgb(0, 0, 0);
  flex-direction: column;
  width: 100%;
  height: 85vh;
  overflow-y: scroll;
  align-items: flex-start;
  padding-top: 10px;

  &::-webkit-scrollbar {
	width: 0;
  }
`;


class WebRTCChatPage extends React.Component {
	constructor(props) {
		super(props);

		const peer = new Peer();

		this.state = {
			webRTCMessages: [],
			peer,
			foreignInputValue: '',
			foreignPeerID: {},
			myPeerConn: {},
			myPeerID: {},
		};

		peer.on('open', (id) => {
			this.setState(() => ({ myPeerID: id }));
			// console.log(id);
		});
		peer.on('connection', (conn) => {
			this.setState(() => ({foreignPeerConn: conn}));
			conn.on('data', (data) => {
				// console.log(data);
			});
		});

		this.handleForeignIDSubmit = this.handleForeignIDSubmit.bind(this);
		this.handleForeignIDInputChange = this.handleForeignIDInputChange.bind(this);
		this.handleWebRTCMessagesChange = this.handleWebRTCMessagesChange.bind(this);
		this.createMessage = this.createMessage.bind(this);
	}

	handleForeignIDInputChange(event) {
		this.setState({ foreignInputValue: event.target.value });
	}

	handleForeignIDSubmit(event) {
		event.preventDefault();
		const {
			peer,
			foreignInputValue,
		} = this.state;

		this.setState(() => ({ foreignPeerID: foreignInputValue }));
		this.setState(() => ({ myPeerConn: peer.connect(foreignInputValue) }));
		this.setState(() => ({ foreignInputValue: '' }));
	}

	handleWebRTCMessagesChange(newMessage) {
		const { webRTCMessages } = this.state;
		this.setState({ webRTCMessages: webRTCMessages.concat(newMessage)});
	}

	// eslint-disable-next-line class-methods-use-this
	createMessage(message) {
		// eslint-disable-next-line no-console
		console.log(message);
	}

	render() {
		const { webRTCMessages } = this.state;
		return (
			<div>
				<HeaderChat chatName='WebRTC' />
				<div className='messageList'>
					<Result>
						{webRTCMessages.map((message) => (
							/* <MessageBlock
								key={message.id}
								time={message.added_at}
								content={message.content}
								userId={user.id}
								messageUserId={message.user}
							/> */
							<div key={message.id}/>
						))}
					</Result>
					<FormInput createMessage={this.createMessage} />
				</div>
			</div>
		);
	}
}

export default WebRTCChatPage;