import React from 'react';
import styled from '@emotion/styled';
import close from '../assets/cross.svg';

const Button = styled.img`
	width: 1.5em;
	margin-right: 10px;
	&:hover {
		filter: invert(1);
	}
`;


function CloseButton(props) {
	return (
		<Button src={ close } onClick={()=>props.handleModal()}/>
	);
}

export default CloseButton;