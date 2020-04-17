import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import HeaderProfile from './HeaderProfile';
import Avatar from './Buttons/Avatar';

const ProfileContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Input = styled.input `
	width: 100%;
	height: 30px;
	background-color: #f1f1f1;
	border: 0px;
	outline: none;
`;

const Container = styled.div`
	margin-bottom: 5px;
	margin-top: 30px;
	height: 35px;
	padding: 10px;
	width: 90%;
	max-width: 500px;
	min-width: 100px;
	display: flex;
	flex-direction: column;
	align-items: start;
	background-color: #f1f1f1;
	border-bottom: 2px solid gray;
`;

const ContainerTextArea = styled.div`
	margin-bottom: 5px;
	margin-top: 30px;
	padding: 10px;
	width: 90%;
	max-width: 500px;
	min-width: 100px;
	display: flex;
	flex-direction: column;
	align-items: start;
	background-color: #f1f1f1;
	border-bottom: 2px solid gray;
`;

const Label = styled.div`
	color: gray;
	font-size: 10pt; 
`;

const Info = styled.div`
	margin: 0;
	color: gray;
	font-size: 10pt; 
`;

const InputBio = styled.textarea`
	display: flex;
	background-color: #f1f1f1;
    flex-grow: 30;
    word-wrap: break-word;
    box-sizing: border-box;
    border: 0;
    outline: none;
    width: 95%;
    resize: none;
    margin-bottom: 0;
	&::-webkit-scrollbar {
		width: 0;
	}
`;

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.state;
		this.setFullName = props.setFullName;
		this.setUserName = props.setUserName;
		this.setBio = props.setBio;

		this.fullNameOnChange = this.fullNameOnChange.bind(this);
		this.userNameOnChange = this.userNameOnChange.bind(this);
		this.bioOnChange = this.bioOnChange.bind(this);
		this.saveData = this.saveData.bind(this);
	}

	fullNameOnChange(event) {
		this.setState({
			fullName: event.target.value,
		});
	}

	userNameOnChange(event) {
		this.setState({
			userName: event.target.value,
		});
	}

	bioOnChange(event) {
		this.setState({
			bio: event.target.value,
		});
	}

	saveData() {
		this.setFullName(this.state.fullName);
		this.setUserName(this.state.userName);
		this.setBio(this.state.bio);
	}

	render() {
		return (
			<div>
				<HeaderProfile saveData={this.saveData}/>
				<ProfileContainer>
					<Avatar/>
					<Container>
						<Label>Полное имя</Label>
						<Input name="fullname"
							type='text' 
							minLength={1}
							onChange={this.fullNameOnChange}
							value={this.state.fullName} />
					</Container>
					<Container>
						<Label>Имя пользователя</Label>
						<Input
							type='text'
							minLength={5}
							onChange={this.userNameOnChange}
							value={`@${this.state.userName.slice(1)}`} />
					</Container>
					<Info>Минимальная длина - 5 символов</Info>
					<ContainerTextArea>
						<Label>О себе</Label>
						<InputBio
							type='text'
							minLength={0}
							onChange={this.bioOnChange}
							value={this.state.bio} />
					</ContainerTextArea>
					<Info>Любые подробности</Info>
				</ProfileContainer>
			</div>
		);
	}
}


Profile.propTypes = {
	setFullName: PropType.func.isRequired,
	setUserName: PropType.func.isRequired,
	setBio: PropType.func.isRequired,
	state: PropType.shape({
		fullName: PropType.string,
		userName: PropType.string,
		bio: PropType.string,
	}).isRequired,
};

export default Profile;