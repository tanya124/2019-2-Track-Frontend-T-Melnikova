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

let keys = [];

for (let i = 0; i < localStorage.length; ++i) {
  let key = localStorage.key(i);
  if (key !== 'loglevel:webpack-dev-server') {
    let keyParse = JSON.parse(key);
    keys.push(keyParse);
  }
}

keys.sort((lhs, rhs) => (lhs.index - rhs.index));


for (let i = 0; i < keys.length; ++i) {
  let keyParse = keys[i];
  let key = JSON.stringify(keyParse);
  message_form._createMessageBlock(localStorage.getItem(key), keyParse.name, keyParse.time);
}
