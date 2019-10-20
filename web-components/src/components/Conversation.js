/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');

template.innerHTML = `
<style>
    .conversation_block {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 9vh;
      position:relative;
      margin: 0;
    }
    .photo {
      flex-grow:1;
      wigth:60px;
      height: 60px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 20;
      padding:0 10px;
      border-bottom-style: solid;
      border-width-bottom: 1px;
      border-bottom-color: #f1f1f1;
    }
    .name-time, .message-indicator {
      display: flex;
      flex-direction: row;
      margin-top: 5px;
    }

    .message, .name {
      flex-grow: 10;
    }
    .message {
      font-size: 13px; 
      color: gray;
    }
    .time, .indicator {
      flex-grow: 0;
      justify-content: flex-end;
      font-size: 12px; 
      color: gray;
    }
    .photo svg {
      fill: gray;
      border: 2px solid #f1f1f1;
      border-radius: 100%;
    }
  </style>

  <div class="conversation_block">
    <div class="photo">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512">
            <path d="M288 353.306v-26.39c35.249-19.864 64-69.386 64-118.916 0-79.529 0-144-96-144s-96 64.471-96 144c0 49.53 28.751 99.052 64 118.916v26.39c-108.551 8.874-192 62.21-192 126.694h448c0-64.484-83.449-117.82-192-126.694z"></path>
        </svg>
    </div>
    <div class="content">
        <div class="name-time">
            <div class="name"></div>
            <div class="time"></div>
        </div>
        <div class="message-indicator">
            <div class="message"></div>
            <div class="indicator">+</div>
        </div>
    </div>
  </div>
`;

class Conversation extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$block_conversation = this._shadowRoot.querySelector('.conversation');
    this.$id_conversation = 0;
    this.$messages = [];
    this.$name = this._shadowRoot.querySelector('.name');
    this.$time = this._shadowRoot.querySelector('.time');
    this.$last_message = this._shadowRoot.querySelector('.message');
    this.$indicator = this._shadowRoot.querySelector('.indicator');
  }

  set id_chat(number) {
    this.$id_conversation = number;
  }

  get id_chat() {
    return this.$id_conversation;
  }

  _getTime() {
    let date = new Date();
    return `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}:${date.getSeconds()}`;
  }

  _setData(username, last_message, time) {
    this.$name.value = username;
    this.$name.appendChild(document.createTextNode(username));
    if (time === '') {
      time = this._getTime();
    }

    this.$time.appendChild(document.createTextNode(time.substr(0, 5)));
    if (last_message === '' || last_message === undefined) {
      last_message = 'Чат создан';
    }
    this.$last_message.appendChild(document.createTextNode(last_message));
  }

  _setMessages() {
    let chats = JSON.parse(window.localStorage.getItem('chats'));

    for (let i = 0; i < chats.length; ++i) {
      if (chats[i].id === this.$id_conversation) {
        this.$messages = chats[i].messages;
        break;
      }
    }
  }

  _onClick() {
    this._setMessages();

    let chats = document.getElementsByClassName('chats')[0];
    let conversation = document.getElementsByClassName('conversation')[0];
    let message_form = document.getElementById('message-form');
    let name = document.getElementsByClassName('name')[0];
    name.appendChild(document.createTextNode(this.$name.value));
    message_form.id_chat = this.$id_conversation;

    chats.style.display = 'none';
    conversation.style.display = 'block';

    for (let i = 0; i < this.$messages.length; ++i) {
      message_form._createMessageBlock(this.$messages[i].content, this.$messages[i].name, this.$messages[i].time);
    }
  }
}

customElements.define('conversation-block', Conversation);
