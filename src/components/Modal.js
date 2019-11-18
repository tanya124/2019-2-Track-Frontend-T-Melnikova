import React from 'react';
import Portal from './Portal';
import '../styles/ModalStyles.css';
import CloseButton from './CloseButton';

class Modal extends React.Component {
	state = {
		inputText: '',
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
					<div className='modalWindow'>
						<div className='modalHeader'>
							<p>Новый чат</p>
							<CloseButton handleModal={this.props.handleModal}/>
						</div>
						<input className='modalBody' type="text" value={inputText} onChange={this.handleInputChange} placeholder="Введите имя собеседника" autoComplete="off" height='30' border='0'/>
						<div className='modalFooter'>
							<input type="button" value="Создать чат" onClick={this.handleSubmit}/>
						</div>
					</div>
				</div>
			</Portal>
		);
	}
}

/*function Modal(props) {
	return (
		<Portal >
			<div className='modalOverlay'>
				<div className='modalWindow'>
					<div className='modalHeader'>
						<p>Новый чат</p>
						<CloseButton handleModal={props.handleModal}/>
					</div>
					<input className='modalBody' type="text" placeholder="Введите имя собеседника" autoComplete="off" height='30' border='0'/>
					<div className='modalFooter'>
						<input type="button" value="Создать чат" />
					</div>
				</div>
			</div>
		</Portal>
	);
}*/

export default Modal;