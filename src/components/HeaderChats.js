import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import '../styles/Header.css';
import SearchButton from './Buttons/SearchButton';
import BurgerButton from './Buttons/BurgerButton';
import Portal from './Portal';

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

const MenuListContainer = styled.div`
  position: absolute;
  top: 9vh;
  left: 10px;
  transform: translate(-10%, -10%);
  background-color: #f1f1f1;
  width: 130px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-width: 0;
`;

const Button = styled.div`
  color: black;
  padding: 5px;
  border-bottom: 1px solid gray;
`;

function MenuList() {
	return (
		<Portal>
			<MenuListContainer>
				<Link className="linkChat" to='/2019-2-Track-Frontend-T-Melnikova/profile'>
					<Button>
					Редактировать профиль
					</Button>
				</Link>
			</MenuListContainer>
		</Portal>
	);
}

class HeaderChats extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			menuIsOpen: false,
		};

		this.changeStateMenu = this.changeStateMenu.bind(this);
	}

	changeStateMenu() {
		const current = this.state.menuIsOpen;
		this.setState({
			menuIsOpen: !current,
		});
	}

	render() {
		return (
			<TopBar>
				<BurgerButton changeStateMenu={this.changeStateMenu}/>
				{this.state.menuIsOpen && <MenuList />}
				<Title>Чаты</Title>
				<SearchButton />
			</TopBar>
		);
	}
}

export default HeaderChats;
