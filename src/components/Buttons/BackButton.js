import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import back from '../../assets/back.svg';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function BackButton(props) {
	return (
		<Button src={ back } onClick={()=>props.setMode()}/>
	);
}

BackButton.propTypes = {
	setMode: PropType.func.isRequired, 
};

export default BackButton;
