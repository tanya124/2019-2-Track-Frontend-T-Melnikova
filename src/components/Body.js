import React from 'react';
import ChatList from './ChatList';
import MessageList from './MessageList';

function findChat(id) {
	const chats = (JSON.parse(localStorage.getItem('chats'))) || [];
	let nodeChat = {};
	for (let i = 0; i < chats.length; ++i) {
		if (chats[i].id === id) {
			nodeChat = chats[i];
			break;
		}
	}
	return nodeChat;
}

function Body(props) {
	const { mode, chatId } = props.state;
	const chat = findChat(chatId);


	switch (mode) {
		case 'messages':
			return <MessageList chat={chat}/>;
		case 'chats':
			return <ChatList setMessagesMode={props.setMessagesMode}/>;
		default:
			break;
	}
}

export default Body;