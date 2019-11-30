import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import HeaderChat from './HeaderChat';
import MessageList from './MessageList';

const Container = styled.div``;

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

const ChatPage = (props) => {
	const chatId = Number(props.match.params.id);
	const chat = findChat(chatId);
	return (
		<Container>
			<HeaderChat />
			<MessageList chat={chat}/> 
		</Container>
	);
};

ChatPage.propTypes = {
	match: PropType.shape({
		params: PropType.shape({
			id : PropType.node,
		}).isRequired,
	}).isRequired,
};

export default ChatPage;