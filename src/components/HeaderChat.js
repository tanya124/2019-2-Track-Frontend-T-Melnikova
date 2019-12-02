import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import SearchButton from './Buttons/SearchButton';
import BackButton from './Buttons/BackButton';
import InfoButton from './Buttons/InfoButton';

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: blueviolet;
  height: 8vh;
`;

const Title = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  color: white;
  font-weight: bold;
  font-size: 2.5vh;
`;

const SearchAndInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

function HeaderChat(props) {
	return (
		<TopBar>
			<Link className='link' to='/' > 
				<BackButton />
			</Link> 
			<Title>{props.chatName}</Title>
			<SearchAndInfo>
				<SearchButton />
				<InfoButton />
			</SearchAndInfo>
		</TopBar>
	);

}

export default HeaderChat;

HeaderChat.propTypes = {
	chatName: PropType.string.isRequired,
};