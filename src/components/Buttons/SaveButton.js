import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import checkmark from '../../assets/checkmark.svg';

const Button = styled.img`
	width: 3em;
	margin-right: 10px;
	&:hover {
		filter: invert(0.5);
	}
`;

function Save(props) {
	return (
		<Button src={ checkmark } onClick={()=>props.saveData()} />
	);
}

export default Save;

Save.propTypes = {
	saveData: PropType.func.isRequired,
};