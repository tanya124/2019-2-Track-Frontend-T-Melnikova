import './index.css';
import './components/Conversation';
import './components/ListConversations';
import './components/FormInput';
import './components/MessageForm';

let message_form = document.getElementById('message-form');
// let username = prompt('Введите ваше имя', '');
let username = 'kek';
if (!username) {
  username = '';
}
message_form._setUserName(username);

let chats_array = localStorage.getItem('chats');
if (!chats_array || !chats_array.length) {
  localStorage.setItem('chats', JSON.stringify([]));
}
chats_array = JSON.parse(chats_array) || [];

const chats_window = document.getElementById('list-conversations');

if (chats_array.length) {
  for (const chat of chats_array.reverse()) {
    const len_mssages_array = chat.messages.length;
    if (len_mssages_array > 0) {
      chats_window._createChatBlock(chat.id, chat.name, chat.messages[len_mssages_array - 1].content, chat.messages[len_mssages_array - 1].time);
    } else {
      chats_window._createChatBlock(chat.id, chat.name, '', '');
    }
  }
}

// Переход из беседы к списку бесед
const chats = document.getElementsByClassName('chats')[0];
const conversation = document.getElementsByClassName('conversation')[0];
const back_button = document.getElementsByClassName('back-button')[0];
const name = document.getElementsByClassName('name')[0];

back_button.onclick = function () {
  conversation.style.display = 'none';
  message_form._clearForm();
  name.removeChild(name.firstChild);

  chats.style.display = 'block';
  chats_array = JSON.parse(localStorage.getItem('chats'));
  for (const chat of chats_array.reverse()) {
    const len_mssages_array = chat.messages.length;
    if (len_mssages_array > 0) {
      chats_window._createChatBlock(chat.id, chat.name, chat.messages[len_mssages_array - 1].content, chat.messages[len_mssages_array - 1].time);
    } else {
      chats_window._createChatBlock(chat.id, chat.name, '', '');
    }
  }
};
