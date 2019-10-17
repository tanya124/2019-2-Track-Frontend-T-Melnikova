/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
import './index.css';

import './components/FormInput';
import './components/MessageForm';

// eslint-disable-next-line camelcase
let message_form = document.getElementById('message-form');
// eslint-disable-next-line no-alert
let name = prompt('Введите ваше имя', '');
if (name === null) {
  name = '';
}
message_form._setUserName(name);

let messages = [];
let item = localStorage.getItem('messages');
if (item !== null) {
  messages = JSON.parse(item);
}

for (let i = 0; i < messages.length; ++i) {
  // eslint-disable-next-line max-len
  message_form._createMessageBlock(messages[i].content, messages[i].name, messages[i].time);
}
