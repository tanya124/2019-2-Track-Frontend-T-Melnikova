import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import emoji from '../../assets/emoji.svg';

const Button = styled.img`
	width: 3em;
	margin-left: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function EmojiBlockButton(props) {
	return (
		<Button src={ emoji } onClick={()=>props.changeEmojiBlockState()}/>
	);
}

export default EmojiBlockButton;

EmojiBlockButton.propTypes = {
	changeEmojiBlockState: PropType.func.isRequired,
};