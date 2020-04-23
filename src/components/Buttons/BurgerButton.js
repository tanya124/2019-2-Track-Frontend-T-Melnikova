import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import menu from '../../assets/menu.svg';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function BurgerButton(props) {
	return (
		<Button name="burger_button" src={ menu } onClick={()=>props.changeStateMenu()}/>
	);
}

export default BurgerButton;

BurgerButton.propTypes = {
	changeStateMenu: PropType.func.isRequired,
};
