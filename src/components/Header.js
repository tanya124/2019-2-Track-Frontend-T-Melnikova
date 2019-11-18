import React from 'react';
import styled from '@emotion/styled';
// import { keyframes } from '@emotion/core';
import PropType from 'prop-types';
import SearchButton from './SearchButton';
import BurgerButton from './BurgerButton';
import BackButton from './BackButton';
import InfoButton from './InfoButton';

/* const year = new Date().getFullYear();

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const TopBar = styled.div`
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: #fff;

	.redux-logo {
		animation: ${rotate360} infinite 20s linear;
		height: 80px;
	}
`;

function Header() {
	return (
		<TopBar>
			<img src={logo} className="redux-logo" alt="logo" />
			<h2>Track Mail.Ru, {year}</h2>
		</TopBar>
	);
} */

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

function Header(props) {
	const { mode, title } = props.state;
	switch (mode) {
		case 'messages':
			return (
				<TopBar>
					<BackButton setMode={props.setChatsMode} />
					<Title>{title}</Title>
					<SearchAndInfo>
						<SearchButton />
						<InfoButton />
					</SearchAndInfo>
				</TopBar>
			);
		case 'chats':
			return (
				<TopBar>
					<BurgerButton />
					<Title>{title}</Title>
					<SearchButton />
				</TopBar>
			);
		default:
			break;
	}
}

Header.propTypes = {
	setChatsMode: PropType.func.isRequired,
};

export default Header;
