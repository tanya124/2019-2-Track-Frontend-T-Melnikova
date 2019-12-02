import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';
import AttachButton from './Buttons/AttachButton';
import Portal from './Portal';
import '../styles/FormInputStyles.css';
import location from '../assets/location.svg';
import photo from '../assets/camera.svg';
import micro from '../assets/mic.svg';

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

const Button = styled.a`
  color: black;
  padding: 5px;
  border-bottom: 1px solid gray;
  width: 100%;
`;

const Location = styled.img`
  width: 2em;
  margin-left: 5px;
  margin-right: 5px;
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
`;

const Photo =   styled.img`
  width: 2em;
  margin-left: 5px;
  margin-right: 5px;
`;

const MicroOff = styled.img`
  width: 2em;
  margin-left: 5px;
  margin-right: 5px;
`;

const MicroOn = styled.img`
  background-color: red;
  width: 2em;
  margin-left: 5px;
  margin-right: 5px;
`;

function AttachMenu(props){
	const img = React.createRef();

	return(
		<Portal>
			<MenuListContainer>
				<Label onClick={()=>props.sendLocaion()}>
					<Location src={ location } />
					<Button>
					Геопозиция
					</Button>
				</Label>
				<Label onClick={(event) => {
					if (img) {
						img.current.click();
					}
				}}>
					<Photo src={photo} />
					<Button>Фото</Button>
					<input
						type="file"
						ref={img}
						multiple
						accept="image/*"
						style={{ display: 'none' }}
						onChange={props.onImageLoad}
					/>
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
			audioIsRecord: false,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeMenuState = this.changeMenuState.bind(this);
		this.changeAudioState = this.changeAudioState.bind(this);
		this.sendLocaion = this.sendLocaion.bind(this);
		this.onImageLoad = this.onImageLoad.bind(this);
		this.onAudioLoad = this.onAudioLoad.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}

	onImageLoad(event, files = event.target.files) {
		const x = this.state.value;
		if (files.length) {
			const formData = new FormData();
			const src = [];
			for (let i = 0; i < files.length; ++i) {
				src[i] = window.URL.createObjectURL(files[i]);
				formData.append('image', files[i]);
			}
			this.props.createMessage(src, 'image');
			fetch('https://tt-front.now.sh/upload', {
				method: 'POST',
				body: formData,
			});
		}
	}

	onAudioLoad() {
		this.changeAudioState();
		const { createMessage } = this.props;
		const changeState = this.changeAudioState;

		function recordAudio(stream) {
			const stop = document.getElementById('stop');
			const chunks = [];

			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.start();

			mediaRecorder.addEventListener('dataavailable', (event) => {
				chunks.push(event.data);
			});

			mediaRecorder.addEventListener('stop', () => {
				const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
				const audioURL = URL.createObjectURL(blob);
				const content = [audioURL];
				createMessage(content, 'audio');

				const data = new FormData();
				data.append('audio', blob);
				fetch('https://tt-front.now.sh/upload', {
					method: 'POST',
					body: data,
				});
			});


			stop.addEventListener('click', () => {
				mediaRecorder.stop();
				changeState();
			});
		}

		async function getMedia() {
			let stream = null;
	
			try {
				const constraints = { audio: true };
				stream = await navigator.mediaDevices.getUserMedia(constraints);
				recordAudio(stream);
			} catch (error) {
				console.log(error.message);
			}
		}
	
		getMedia();
	}

	changeAudioState() {
		const current = this.state.audioIsRecord;
		this.setState({
			audioIsRecord: !current,
		});
	}

	sendLocaion() {
		this.changeMenuState();
		navigator.geolocation.getCurrentPosition((position) => {
			const textLink = `https://www.openstreetmap.org/#map=18/${  position.coords.latitude  }/${  position.coords.longitude}`;
			this.props.createMessage(textLink, 'location');
		});
	}

	changeMenuState() {
		console.log(1);
		const current = this.state.attachMenuIsOpen;
		this.setState({
			attachMenuIsOpen: !current,
		});
	}

	handleDrop(event) {
		event.stopPropagation();
		event.preventDefault();
		const { files } = event.dataTransfer;
		this.onImageLoad(event, files);
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
				this.props.createMessage(message, 'text');
			}
		}
	}

	render() {
		const { value } = this.state;
		return (
			<form className='formInput'>
				<TextArea value={value} onDrop={this.handleDrop} onChange={this.handleInputChange} onKeyPress={this.handleSubmit} placeholder='Сообщение' autoComplete="off"/>
				{!this.state.audioIsRecord && <MicroOff id='start' src={micro} onClick={this.onAudioLoad}/>}
				{this.state.audioIsRecord && <MicroOn id='stop' src={micro} />}
				<AttachButton className='attachButton' changeMenu={this.changeMenuState}/>
				{this.state.attachMenuIsOpen && <AttachMenu sendLocaion={this.sendLocaion} onImageLoad={this.onImageLoad}/>}
			</form>
		);
	}
}

FormInput.propTypes = {
	createMessage: PropType.func.isRequired,
};

AttachMenu.propTypes = {
	sendLocaion: PropType.func.isRequired,
	onImageLoad: PropType.func.isRequired,
};

export default FormInput;
