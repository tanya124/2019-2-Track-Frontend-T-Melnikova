import './index.css';
import './components/Conversation';
import './components/ListConversations';
import './components/FormInput';
import './components/MessageForm';

let chats_array = localStorage.getItem('chats');
if (chats_array === null) {
  localStorage.setItem('chats', JSON.stringify([]));
}
chats_array = JSON.parse(chats_array) || [];

let chats_window = document.getElementById('list-conversations');

if (chats_array.length !== 0) {
  for (let i = chats_array.length - 1; i >= 0; --i) {
    let len_mssages_array = chats_array[i].messages.length;
    if (len_mssages_array > 0) {
      chats_window._createChatBlock(chats_array[i].id, chats_array[i].name, chats_array[i].messages[len_mssages_array - 1].content, chats_array[i].messages[len_mssages_array - 1].time);
    } else {
      chats_window._createChatBlock(chats_array[i].id, chats_array[i].name, '', '');
    }
  }
}

// Переход из беседы к списку бесед
let chats = document.getElementsByClassName('chats')[0];
let conversation = document.getElementsByClassName('conversation')[0];
let back_button = document.getElementsByClassName('back-button')[0];
let message_form = document.getElementById('message-form');
let name = document.getElementsByClassName('name')[0];

back_button.onclick = function () {
  conversation.style.display = 'none';
  message_form._clearForm();
  name.removeChild(name.firstChild);

  chats.style.display = 'block';
  chats_array = JSON.parse(localStorage.getItem('chats'));
  for (let i = chats_array.length - 1; i >= 0; --i) {
    let len_mssages_array = chats_array[i].messages.length;
    if (len_mssages_array > 0) {
      chats_window._createChatBlock(chats_array[i].id, chats_array[i].name, chats_array[i].messages[len_mssages_array - 1].content, chats_array[i].messages[len_mssages_array - 1].time);
    } else {
      chats_window._createChatBlock(chats_array[i].id, chats_array[i].name, '', '');
    }
  }
};
