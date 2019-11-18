import React from 'react';
import PropType from 'prop-types';
import FormInput from './FormInput';
import '../styles/MessageListStyles.css';


function MessageBlock(props) {
	const {id, name, time, content } = props;
	let time_send = String(time);
	time_send = time_send.slice(0, time_send.lastIndexOf(':'));
	return (
		<div className='messageBlock from'>
			<div className='content'>{content}</div>
			<div className='time'>{time_send}</div>
		</div>
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
				<div className='result'> 
					{messages.map((message) => (
						<MessageBlock
							key={message.id}
							id={message.id}
							name={message.name}
							time={message.time}
							content={message.content} 
						/>
					))}
				</div>
				<FormInput createMessage={this.createMessage}/>
			</div>
		);
	}
}

MessageList.propTypes = {
	// chat: PropType.object,
};

export default MessageList;