const template = document.createElement('template');
template.innerHTML = `
    <style>
        .result {
            display: flex;
            color: black;
            flex-direction: column;
            width: 100%;
            height: 85vh;
            overflow-y: scroll;
            align-items: flex-start;
        }
        .result::-webkit-scrollbar { 
            width: 0;
        }
        .username {
            border: 2;
            outline: none;
            wigth: 10%;
            padding: 0 20px;
        }
        input[type=submit] {
            visibility: collapse;
        }
        .message_block {
            display: flex;
            flex-direction: column;
            align-self: flex-end;
            justify-content: flex-start;
            max-width: 80%;
            min-width: 7%;
            word-wrap: break-word;
            margin-bottom: 12px;
            line-height: 24px;
            position:relative;
            padding:10px 20px 0px 20px;
            margin-right: 10px;
            border-radius: 15px;
            background-color: #f1f1f1;
        }
        .message_block::after { 
            content: ''; 
            position: absolute; 
            width: 0; 
            height: 0; 
            right: -8px; 
            bottom: 0px;  
            border: 10px solid; 
            border-color: transparent transparent #f1f1f1 #f1f1f1; 
        }
        .name {
            height: 100%;
            color: #ffc16d;
            font-weight: bold;
            padding: 0 0;
        }
        .message {
            max-width: 100%;
            word-wrap: break-word;
        }
        .message_block .time {
            display: flex-inline;
            font-size: 10px; 
            color: gray;
            text-align: right;
            padding: 0 0;
        }
        form-input {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-button: 0px;
        }
    </style>
    <form>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Cообщение"></form-input>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this._shadowRoot.querySelector('form');
    this.$input = this._shadowRoot.querySelector('form-input');
    this.$message = this._shadowRoot.querySelector('.result');
    this.$username = '';
    this.$id_chat = 0;

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
  }

  set id_chat(id_val) {
    this.$id_chat = id_val;
  }

  _setUserName(name) {
    this.$username = name;
  }

  _scrollToLast() {
    this.$message.scrollTop = this.$message.scrollHeight;
  }

  _createMessageBlock(content, user_name, time_send) {
    let message_block = document.createElement('div');
    message_block.setAttribute('class', 'message_block');

    let name = document.createElement('div');
    name.setAttribute('class', 'name');
    let user_name_format = document.createTextNode(`${user_name}:`);
    name.appendChild(user_name_format);
    message_block.appendChild(name);

    let text_message = document.createElement('div');
    text_message.setAttribute('class', 'message');

    let messageList = content.split('\n');
    let flag = true; // true, если элементы еще не добавлялись
    for (let i = 0; i < messageList.length; ++i) {
      if (messageList[i] !== '' || (messageList[i] === '' && !flag)) {
        let row = document.createTextNode(messageList[i]);
        text_message.appendChild(row);
        text_message.appendChild(document.createElement('br'));
        flag = false;
      }
    }

    message_block.appendChild(text_message);

    let time = document.createElement('div');
    time.setAttribute('class', 'time');
    let format_time = document.createTextNode(time_send.slice(0, time_send.lastIndexOf(':')));
    time.appendChild(format_time);
    message_block.appendChild(time);

    this.$message.appendChild(message_block);

    this._scrollToLast();
  }

  _getUserName() {
    let user_name;
    if (this.$username !== '') {
      user_name = this.$username;
    } else {
      user_name = 'Anonymous';
    }
    return user_name;
  }

  _getTime() {
    let date = new Date();
    return `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}:${date.getSeconds()}`;
  }

  _onSubmit(event) {
    event.preventDefault();
    let user_name = this._getUserName();
    let time_send = this._getTime();
    this._createMessageBlock(this.$input.value, user_name, time_send);
  }

  _onKeyPress(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      if (this.$input.value !== '' && this.$input.value !== '\n') {
        this.$form.dispatchEvent(new Event('submit'));

        let user_name = this._getUserName();
        let time_send = this._getTime();


        let chats = JSON.parse(window.localStorage.getItem('chats'));
        let node_chat = [];
        for (let i = 0; i < chats.length; ++i) {
          if (chats[i].id === this.$id_chat) {
            node_chat = chats[i];
            chats.splice(i, 1);
            break;
          }
        }
        node_chat.messages.push({
          name: user_name,
          time: time_send,
          content: this.$input.value,
        });
        chats.push(node_chat);

        window.localStorage.setItem('chats', JSON.stringify(chats));
      }
      this.$input._reset();
    }
  }

  _clearForm() {
    while (this.$message.firstChild) {
      this.$message.removeChild(this.$message.firstChild);
    }
  }
}

customElements.define('message-form', MessageForm);
