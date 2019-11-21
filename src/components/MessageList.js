import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import FormInput from './FormInput';
import '../styles/MessageListStyles.css';

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

const MessageFrom = styled.div`
  align-self: flex-end;
  margin-right: 10px;
  background-color: rgb(242, 227, 255);
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: bouceInRight;

  &::after {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	right: -8px;
	bottom: 0;
	border: 10px solid;
	border-color: transparent transparent rgb(242, 227, 255) rgb(242, 227, 255);
  }
`;

/* const MessageTo = styled.div`
  align-self: flex-start;
  margin-left: 10px;
  background-color: rgb(241, 241, 241);
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: bounceInLeft;

  &::after {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	left: -8px;
	bottom: 0;
	border: 10px solid;
	border-color: transparent rgb(241, 241, 241) rgb(241, 241, 241) transparent;
  }
`; */

function MessageBlock(props) {
	const { time, content } = props;
	let timeSend = String(time);
	timeSend = timeSend.slice(0, timeSend.lastIndexOf(':'));
	return (
		<MessageFrom className='messageBlock'>
			<div className='content'>{content}</div>
			<div className='time'>{ timeSend }</div>
		</MessageFrom>
	);
}

function getTime() {
	const date = new Date();
	return `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}:${date.getSeconds()}`;
}

class MessageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.chat.id,
			messages: props.chat.messages,
			chat: props.chat,
		};
		this.createMessage = this.createMessage.bind(this);
		this.setMessages = this.setMessages.bind(this);
		this.updateChats = this.updateChats.bind(this);
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	setMessages(_messages) {
		this.setState(() => ({
			messages: _messages,
		}));
	}

	setChat(_chat) {
		this.setState(() => ({
			chat: _chat,
		}));
	}

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
	}

	updateChats() {
		const { id } = this.state;
		const chats = (JSON.parse(localStorage.getItem('chats')));
		let nodeChat = {};
		for (let i = 0; i < chats.length; ++i) {
			if (chats[i].id === id) {
				nodeChat = chats[i];
				chats.splice(i, 1);
				break;
			}
		}
		nodeChat = this.state.chat;
		chats.push(nodeChat);
		localStorage.setItem('chats', JSON.stringify(chats));
	}

	createMessage(message) {
		const { messages } = this.state;
		const currentTime = getTime(); 
		const item = {
			id: messages.length,
			name: this.state.chat.name,
			time: currentTime,
			content: message,
		};
		messages.push(item);
		this.setMessages(messages);
		const { chat } = this.state;
		chat.messages = this.state.messages;
		chat.last_message = message;
		chat.time = getTime();
		this.setChat(chat);
		this.updateChats();
	}

	render() {
		const { messages } = this.state;
		return (
			<div className='messageList'>
				<Result> 
					{messages.map((message) => (
						<MessageBlock
							key={message.id}
							time={message.time}
							content={message.content} 
						/>
					))}
					<div style={{ float:'left', clear: 'both' }}
						ref={(el) => { this.messagesEnd = el; }} />
				</Result>
				<FormInput createMessage={this.createMessage}/>
			</div>
		);
	}
}

MessageBlock.propTypes = {
	time: PropType.string.isRequired,
	content: PropType.string.isRequired,
};

MessageList.propTypes = {
	chat: PropType.shape({
		id: PropType.number,
		last_message: PropType.string,
		messages: PropType.array,
		name: PropType.string,
		time: PropType.string,
	}).isRequired,
};

export default MessageList;