import React from 'react';
import PropType from 'prop-types';
import AttachButton from './Buttons/AttachButton';
import '../styles/FormInputStyles.css';

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
				<textarea value={value} onChange={this.handleInputChange} onKeyPress={this.handleSubmit} placeholder='Сообщение' autoComplete="off"/>
				<AttachButton className='attachButton'/>
			</form>
		);
	}
}

FormInput.propTypes = {
	createMessage: PropType.func.isRequired,
};

export default FormInput;