import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import SearchButton from './SearchButton';
import BurgerButton from './BurgerButton';
import BackButton from './BackButton';
import InfoButton from './InfoButton';


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
