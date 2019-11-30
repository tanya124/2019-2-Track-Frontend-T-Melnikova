import React from 'react';
import styled from '@emotion/styled';
import back from '../../assets/back.svg';
import {Link} from 'react-router-dom';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function BackButton(props) {
	return (
		<Button src={ back } />
	);
}

export default BackButton;
