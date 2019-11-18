import React from 'react';
import styled from '@emotion/styled';
import clip from '../../assets/clip.svg';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function AttachButton() {
	return (
		<Button src={ clip } />
	);
}

export default AttachButton;