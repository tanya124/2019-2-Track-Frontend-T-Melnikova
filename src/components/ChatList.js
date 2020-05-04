import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import user from '../assets/user.svg';
import pencil from '../assets/pencil.svg';
import Modal from './Modal';
import { parseMessge }  from './Emoji/EmojiBlock';
import '../styles/ChatsStyles.css';

const List = styled.div`
  min-width: 500px;
  display: flex;
  color: black;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
  align-items: flex-start;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 550px;
  height: 63px;
  position: relative;
  margin: 0;
  &:hover {
    background: #f5f5f5;
  }
`;

const Avatar = styled.img`
  width: 3em;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  width: 80%;
  flex-grow: 1;
  flex-direction: column;
  padding: 0 10px;
  border-bottom-style: solid;
  border-width-bottom: 1px;
  border-bottom-color: #f1f1f1;
`;

const NameTime = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const MessageIndicator = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const Name = styled.div`
  max-width: 90%;
  color: black;
`;

const Time = styled.div`
  margin-left: auto;
  width: 10%;
  align-self: flex-end;
  text-align: right;
  font-size: 12px;
  color: gray;
`;

const Message = styled.div`
  max-width: 90%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  color: gray;
  display: flex;
  flex-direction: row;
`;

const Indicator = styled.div`
  margin-left: auto;
  width: 10%;
  align-self: flex-end;
  text-align: right;
  font-size: 12px;
  color: gray;
`;

const CreateChatButton = styled.img`
  padding: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: 2px solid #fff67b;
  background-color: #fff67b;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center

    &:hover {
    box-shadow: 0 0 0 0 #ffffbf;
    transform: scale(1);
    animation: pulse 2s infinite;
  }
`;

function ChatBlock(props) {
	const {id, name, lastMessage} = props;
	// let timeSend = String(time);
	// timeSend = timeSend.slice(0, timeSend.lastIndexOf(':'));
	const timeSend = '4:19';
	return (
		<Link className='chatLink' to={`/2019-2-Track-Frontend-T-Melnikova/chat/${id}`} style={{ textDecoration: 'none' }}>
			<Block id={ name }>
				<Avatar src={ user } />
				<Content>
					<NameTime>
						<Name>{ name }</Name>
						<Time>{ timeSend }</Time>
					</NameTime>
					<MessageIndicator>
						<Message>{ parseMessge(lastMessage) }</Message>
						<Indicator>+</Indicator>
					</MessageIndicator>
				</Content>
			</Block>
		</Link>
	);   
}

class ChatList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalWindowIsOpen: false,
			// chats: JSON.parse(localStorage.getItem('chats')) || [],
			chats: [],
			token: localStorage.getItem('token'),
			user: {},
		};
        
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.createChat = this.createChat.bind(this);
		this.setChats = this.setChats.bind(this);
	}

	componentDidMount() {
		const headers = {
			'Content-Type': 'application/json',
		};
  
		if (this.state.token) {
			headers.Authorization = `Token ${this.state.token}`;
		}
		(async () => {
			await fetch('http://127.0.0.1:8000/chats/api/chats/chat_list/', {
				method: 'GET',
				headers
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					this.setState({ chats: data.chats });
					localStorage.setItem('chats', JSON.stringify(this.state.chats));
				});
		})();


		(async () => {
			await fetch('http://127.0.0.1:8000/users/api/users/profile/', {
				method: 'GET',
				headers
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					this.setState({ user: data.user });
				});
		})();

		
	}

	setChats(_chats) {
		this.setState(() => ({
			chats: _chats,
		}));
	}
    
	openModal() {
		this.setState(() => ({
			modalWindowIsOpen: true,
		}));
	}
    
	closeModal() {
		this.setState(() => ({
			modalWindowIsOpen: false,
		}));
	}
    
	createChat(_name) {
		if(_name !== '') {
			const chatData = new FormData();
			chatData.append('is_group_chat', 'False');
			chatData.append('topic', _name);
			chatData.append('last_message', 'Нет сообщений');
			chatData.append('companion_name', 'user822');


			const headers = {};
			headers.Authorization = `Token ${this.state.token}`;

			fetch('http://127.0.0.1:8000/chats/api/chats/create_chat/', {
				method: 'POST',
				headers,
				body: chatData
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					const newChat = data.chat;
					// eslint-disable-next-line react/no-access-state-in-setstate
					const newChats = this.state.chats;
					newChats.push(newChat);

					this.setState({ chats: newChats});
				});
			localStorage.setItem('chats', JSON.stringify(this.state.chats));
		}
	}
    
	render() {
		const { chats } = this.state;
		return (
			<div>
				{ this.state.modalWindowIsOpen && <Modal handleModal={this.closeModal} createChat={this.createChat}/>}
				<List>
					<Link className='chatLink' to="/webrtc" style={{ textDecoration: 'none' }}>
						<Block id={ 9999 }>
							<Avatar src={ user } />
							<Content>
								<NameTime>
									<Name>WebRTC</Name>
									<Time>4:20</Time>
								</NameTime>
								<MessageIndicator>
									<Message>Welcome to WebRTC chat</Message>
									<Indicator>+</Indicator>
								</MessageIndicator>
							</Content>
						</Block>
					</Link>
					{chats.reverse().map((chat) => (
						<ChatBlock
							key={chat.id}
							id={chat.id}
							name={chat.topic}
							lastMessage={chat.last_message}
						/>
					))}
				</List>
				<CreateChatButton id="create_chat_button" src={ pencil } onClick={() => this.openModal()}/>
			</div>
		);
	}
}

ChatBlock.propTypes = {
	id: PropType.number.isRequired,
	name: PropType.string.isRequired,
	lastMessage: PropType.string.isRequired,
};

export default ChatList;