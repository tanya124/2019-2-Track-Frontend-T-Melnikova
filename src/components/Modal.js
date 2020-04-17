import React from 'react';
import PropType from 'prop-types';
import Portal from './Portal';
import '../styles/ModalStyles.css';
import CloseButton from './Buttons/CloseButton';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange = ({target: { value } }) => {
		this.setState({
			inputText: value,
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { inputText } = this.state;
		const name = inputText;
		this.setState({
			inputText: '',
		});
		this.props.createChat(name);
		this.props.handleModal();
	}

	render() {
		const { inputText } = this.state;
		return (
			<Portal>
				<div className='modalOverlay'>
					<div id="modal" className='modalWindow'>
						<div className='modalHeader'>
							<p>Новый чат</p>
							<CloseButton handleModal={this.props.handleModal}/>
						</div>
						<input name="username" className='modalBody' type="text" value={inputText} onChange={this.handleInputChange} placeholder="Введите имя собеседника" autoComplete="off" height='30' border='0'/>
						<div className='modalFooter'>
							<input type="button" value="Создать чат" onClick={this.handleSubmit}/>
						</div>
					</div>
				</div>
			</Portal>
		);
	}
}

Modal.propTypes = {
	createChat: PropType.func.isRequired,
	handleModal: PropType.func.isRequired,
};

export default Modal;