import React from 'react';
import ChatList from './ChatList';
import MessageList from './MessageList';

function Body(props) {
	const { mode } = props.state;
	

	switch (mode) {
		case 'messages':
			return MessageList(props);
		case 'chats':
			return <ChatList setMessagesMode={props.setMessagesMode}/>;
		default:
			break;
	}
}

export default Body;