import React from 'react';
import styled from '@emotion/styled';
import HeaderChats from './HeaderChats';
import ChatList from './ChatList';

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