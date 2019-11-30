import React from 'react';
import styled from '@emotion/styled';
import camera from '../../assets/camera.svg';

const Button = styled.img`
	width: 3em;
	margin: 30px;
	&:hover {
		filter: invert(0.5);
	}
`;

function Avatar() {
	return (
		<Button src={ camera } />
	);
}

export default Avatar;
