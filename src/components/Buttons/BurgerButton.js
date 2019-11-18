import React from 'react';
import styled from '@emotion/styled';
import menu from '../../assets/menu.svg';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function BurgerButton() {
	return (
		<Button src={ menu } />
	);
}

export default BurgerButton;