import React from 'react';
import styled from '@emotion/styled';
import HeaderChats from '../components/HeaderChats';
import ChatList from '../components/ChatList';

const Container = styled.div``;


function ChatsPage(){
	return (
		<Container>
			<HeaderChats />
			<ChatList /> 
		</Container>
	);
}

export default ChatsPage;