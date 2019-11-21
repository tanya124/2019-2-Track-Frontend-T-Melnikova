import React from 'react';
import PropType from 'prop-types';
import AttachButton from './Buttons/AttachButton';
import styled from '@emotion/styled';
import '../styles/FormInputStyles.css';

const TextArea = styled.textarea`
  display: flex;
  flex-grow: 30;
  word-wrap: break-word;
  box-sizing: border-box;
  border: 0;
  height: 50px;
  outline: none;
  max-width: 95%;
  padding: 15px 20px;
  resize: none;
  margin-bottom: 0;

  &::-webkit-scrollbar {
  	width: 0;
  }
`;

class FormInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			value: event.target.value,
		});
	}

	handleSubmit (event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			const { value } = this.state;
			if (value !== '') {
				const message = value;
				this.setState({
					value: '',
				});
				this.props.createMessage(message);
			}
		}
	}

	render() {
		const { value } = this.state;
		return (
			<form className='formInput'>
				<TextArea value={value} onChange={this.handleInputChange} onKeyPress={this.handleSubmit} placeholder='Сообщение' autoComplete="off"/>
				<AttachButton className='attachButton'/>
			</form>
		);
	}
}

FormInput.propTypes = {
	createMessage: PropType.func.isRequired,
};

export default FormInput;
