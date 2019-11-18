import React from 'react';
import styled from '@emotion/styled';
import list from '../../assets/list.svg';

const Button = styled.img`
	width: 3em;
	margin-right: 10px;
	margin-left: 20px;
	&:hover {
		filter: invert(1);
	}
`;


function InfoButton() {
	return (
		<Button src={ list } />
	);
}

export default InfoButton;