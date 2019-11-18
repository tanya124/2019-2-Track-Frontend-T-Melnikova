import React from 'react';
import styled from '@emotion/styled';
import user from '../assets/user.svg';
import pencil from '../assets/pencil.svg';
import Modal from './Modal';

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
      position:relative;
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
    flex-grow:1;
    flex-direction: column;
    padding:0 10px;
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
	const {id, name, lastMessage, time} = props;
	return (
		<Block onClick={() => props.setMode(id, name)}>
			<Avatar src={ user } />
			<Content>
				<NameTime>
					<Name>{ name }</Name>
					<Time>{ time }</Time>
				</NameTime>
				<MessageIndicator>
					<Message>{ lastMessage }</Message>
					<Indicator>{ '+'}</Indicator>
				</MessageIndicator>
			</Content>
		</Block>
	);
    
}

class ChatList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalWindowIsOpen: false,
			chats: JSON.parse(localStorage.getItem('chats')) || [],
		};
        
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.createChat = this.createChat.bind(this);
		this.setChats = this.setChats.bind(this);
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
    
	setChats(_chats) {
		this.setState(() => ({
			chats: _chats,
		}));
	}
    
	createChat(_name) {
		if(_name !== '') {
			this.setChats(JSON.parse(localStorage.getItem('chats')));
			if (this.state.chats === null) {
				this.setChats([]);
			}
			const chatCopy = this.state.chats;
			const item = {
				id: this.state.chats.length,
				name: _name,
				messages: [],
				time: '',
				last_message: '',
			};
			chatCopy.push(item);
			this.setChats(chatCopy);
			localStorage.setItem('chats', JSON.stringify(this.state.chats));
		}
    }
    
	render() {
		const { chats } = this.state;
		return (
			<div>
				{ this.state.modalWindowIsOpen && <Modal handleModal={this.closeModal} createChat={this.createChat}/>}
				<List>
					{chats.map((chat) => (
						<ChatBlock 
							key={chat.id}
							id={chat.id}
							name={chat.name}
							lastMessage={chat.last_message}
							time={chat.time} 
							setMode={this.props.setMessagesMode} />
					))}
				</List>
				<CreateChatButton src={ pencil } onClick={() => this.openModal()}/>
			</div>
		);
	}
}

export default ChatList;
// this.props.setMessageMode(chat.id, chat.name)}