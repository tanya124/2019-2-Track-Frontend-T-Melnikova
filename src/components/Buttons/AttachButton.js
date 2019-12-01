import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import clip from '../../assets/clip.svg';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function AttachButton(props) {
	return (
		<Button src={ clip } onClick={()=>props.changeMenu()}/>
	);
}

export default AttachButton;

AttachButton.propTypes = {
	changeMenu: PropType.func.isRequired,
};