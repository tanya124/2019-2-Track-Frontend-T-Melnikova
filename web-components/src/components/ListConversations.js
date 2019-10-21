const template = document.createElement('template');

template.innerHTML = `
    <style>
        .list {
            display: flex;
            color: black;
            flex-direction: column;
            width: 100%;
            height: 85vh;
            overflow-y: scroll;
            align-items: flex-start;
        }
        .list::-webkit-scrollbar { 
            width: 0;
        }
        .conversation-block {
            display:flex;
            width:100%;
        }
        .button-create-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border: 2px solid #fff67b;
            background-color: #fff67b;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center
        }

        .button-create-chat svg {
            fill: #986800;
        }

        .form-create-chat {
            width: 75%;
            position: fixed;
            left: 50%;
            margin-left: -37.5%;
            top: 30%;
            background-color: #f1f1f1;
            display: none;
            flex-direction: column;
            align-items: center;
            padding: 10px 10px;
            border-style: solid;
            border-width: 1px;
            border-color: orange;
            border-radius: 10px;
        }
        .form-create-chat input {
            height: 30px;
            padding-left: 10px;
            border: 0;
        }
        .form-create-chat #create {
          margin-top: 10px;
        }
        .form-create-chat svg {
          fill: gray;
        }
        #btn_create_area {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding-right: 10px;
        }
        #head_form {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        p {
          display: flex;
          flex-grow:1;
          justify-content: center;
        }
        #close {
          display: flex;
          justify-content: flex-end;
          padding-right: 10px;
        }

    </style>
    <div class="list"></div>
    <div class="button-create-chat">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512">
            <path d="M432 0c44.182 0 80 35.817 80 80 0 18.010-5.955 34.629-16 48l-32 32-112-112 32-32c13.371-10.045 29.989-16 48-16zM32 368l-32 144 144-32 296-296-112-112-296 296zM357.789 181.789l-224 224-27.578-27.578 224-224 27.578 27.578z"></path>
        </svg>
    </div>
    <div class="form-create-chat">
      <div id="head_form">
        <p>Новый чат</p>
        <div id="close">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512">
              <path d="M507.331 411.33c-0.002-0.002-0.004-0.004-0.006-0.005l-155.322-155.325 155.322-155.325c0.002-0.002 0.004-0.003 0.006-0.005 1.672-1.673 2.881-3.627 3.656-5.708 2.123-5.688 0.912-12.341-3.662-16.915l-73.373-73.373c-4.574-4.573-11.225-5.783-16.914-3.66-2.080 0.775-4.035 1.984-5.709 3.655 0 0.002-0.002 0.003-0.004 0.005l-155.324 155.326-155.324-155.325c-0.002-0.002-0.003-0.003-0.005-0.005-1.673-1.671-3.627-2.88-5.707-3.655-5.69-2.124-12.341-0.913-16.915 3.66l-73.374 73.374c-4.574 4.574-5.784 11.226-3.661 16.914 0.776 2.080 1.985 4.036 3.656 5.708 0.002 0.001 0.003 0.003 0.005 0.005l155.325 155.324-155.325 155.326c-0.001 0.002-0.003 0.003-0.004 0.005-1.671 1.673-2.88 3.627-3.657 5.707-2.124 5.688-0.913 12.341 3.661 16.915l73.374 73.373c4.575 4.574 11.226 5.784 16.915 3.661 2.080-0.776 4.035-1.985 5.708-3.656 0.001-0.002 0.003-0.003 0.005-0.005l155.324-155.325 155.324 155.325c0.002 0.001 0.004 0.003 0.006 0.004 1.674 1.672 3.627 2.881 5.707 3.657 5.689 2.123 12.342 0.913 16.914-3.661l73.373-73.374c4.574-4.574 5.785-11.227 3.662-16.915-0.776-2.080-1.985-4.034-3.657-5.707z"></path>
          </svg>
        </div> 
      </div>   
      <input id="name" type="text" placeholder="Введите имя собеседника">
      <div id="btn_create_area">
        <input id="create" type="button" value="Создать чат">
      </div>
    </div>
`;

class ListConversations extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$conversations_array = JSON.parse(window.localStorage.getItem('chats')) || [];
    this.$list = this._shadowRoot.querySelector('.list');
    this.$chat_creater = this._shadowRoot.querySelector('.button-create-chat');

    this.$form = this._shadowRoot.querySelector('.form-create-chat');
    this.$close_btn = this._shadowRoot.querySelector('#close');
    this.$input = this.shadowRoot.querySelector('#name');
    this.$btn = this._shadowRoot.querySelector('#create');

    this.$list.addEventListener('click', (event) => {
      if (event.target && event.target.className === 'conversation-block') {
        event.target._onClick();
        this._clearList();
      }
    });
    this.$chat_creater.addEventListener('click', this._onClick.bind(this));
    this.$btn.addEventListener('click', this._onClickButtonInForm.bind(this));
    this.$close_btn.addEventListener('click', this._closeForm.bind(this));
  }

  _createChatBlock(id_chat, username, last_massage, time) {
    const chat = document.createElement('conversation-block');
    chat.setAttribute('class', 'conversation-block');
    chat.id_chat = id_chat;
    chat._setData(username, last_massage, time);

    this.$list.appendChild(chat);
  }

  _createChat() {
    this._createChatBlock(this.$conversations_array.length, this.$input.value, '', '');

    const item = {
      id: this.$conversations_array.length,
      name: this.$input.value,
      messages: [],
    };

    this.$conversations_array = JSON.parse(window.localStorage.getItem('chats'));
    this.$conversations_array.push(item);
    window.localStorage.setItem('chats', JSON.stringify(this.$conversations_array));
  }

  _onClickButtonInForm() {
    if (this.$input.value !== '') {
      this._createChat();
      this.$input.value = '';
      this.$form.style.display = 'none';
    }
  }

  _onClick() {
    this.$form.style.display = 'flex';
  }

  _clearList() {
    while (this.$list.firstChild) {
      this.$list.removeChild(this.$list.firstChild);
    }
  }

  _closeForm() {
    this.$form.style.display = 'none';
  }
}

customElements.define('list-conversations', ListConversations);
