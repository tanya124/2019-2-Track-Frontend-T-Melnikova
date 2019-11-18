import React from 'react';
import styled from '@emotion/styled';
import search from '../assets/search.svg';

const Button = styled.img`
	width: 3em;
	margin-right: 10px;
	&:hover {
		filter: invert(1);
	}
`;


function SearchButton() {
	return (
		<Button src={ search } />
	);
}

export default SearchButton;