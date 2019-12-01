import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import AttachButton from './Buttons/AttachButton';
import Portal from './Portal';
import '../styles/FormInputStyles.css';
import location from '../assets/location.svg';

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

const MenuListContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 5px;
  transform: translate(-10%, -10%);
  background-color: #f1f1f1;
  width: 130px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 1px solid gray;
`;

const Button = styled.div`
  color: black;
  padding: 5px;
  border-bottom: 1px solid gray;
`;

const Location = styled.img`
  width: 2em;
  margin-left: 5px;
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
`;

function AttachMenu(props){
	return(
		<Portal>
			<MenuListContainer>
				<Label onClick={()=>props.sendLocaion()}>
					<Location src={ location } />
					<Button>
					Location
					</Button>
				</Label>
			</MenuListContainer>
		</Portal>
	);
}

class FormInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			attachMenuIsOpen: false,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeMenuState = this.changeMenuState.bind(this);
		this.sendLocaion = this.sendLocaion.bind(this);
	}
	
	sendLocaion() {
		this.changeMenuState();
		navigator.geolocation.getCurrentPosition((position) => {
			const textLink = `https://www.openstreetmap.org/#map=18/${  position.coords.latitude  }/${  position.coords.longitude}`;
			// const message = <a><a href = {textLink} >Im here! Press to explore</a><Location src={location}/></a>;
			this.props.createLocationMessage(textLink);
		});
	}

	changeMenuState() {
		const current = this.state.attachMenuIsOpen;
		this.setState({
			attachMenuIsOpen: !current,
		});
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
				<AttachButton className='attachButton' changeMenu={this.changeMenuState}/>
				{this.state.attachMenuIsOpen && <AttachMenu sendLocaion={this.sendLocaion}/>}
			</form>
		);
	}
}

FormInput.propTypes = {
	createMessage: PropType.func.isRequired,
	createLocationMessage: PropType.func.isRequired,
};

AttachMenu.propTypes = {
	sendLocaion: PropType.func.isRequired,
};

export default FormInput;
