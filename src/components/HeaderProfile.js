import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import BackButton from './Buttons/BackButton';
import Save from './Buttons/SaveButton';

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

function HeaderProfile(props) {
	return (
		<TopBar>
			<Link className='link' to={'/chats'} style={{ textDecoration: 'none' }}> 
				<BackButton />
			</Link> 
			<Title>Редактировать профиль</Title>
			<Save saveData={props.saveData}/>
		</TopBar>
	);

}

export default HeaderProfile;

HeaderProfile.propTypes = {
	saveData: PropType.func.isRequired,
};