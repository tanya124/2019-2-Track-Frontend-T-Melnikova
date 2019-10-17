/* eslint-disable no-underscore-dangle */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        textarea {
            display: flex;
            flex-grow:30;
            word-wrap: break-word;
            box-sizing: border-box;
            border: 0;
            min-height: 36px;
            height: 5vh;
            outline: none;
            max-width: 95%;
            padding: 15px 20px;
            resize: none;
            margin-bottom: 0;
        }
        textarea::-webkit-scrollbar { 
            width: 0;
        }
        .attach-button{
            display: flex;
            flex-grow:1;
            justify-content: center;
            align-items: center;
        }
        :host {
            display: inline-block;
            border: 1px solid rgba(25, 25, 25, 0.32);
        }
    </style>
    <textarea></textarea>
    <div class="attach-button">
        <svg width="37" height="37" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <path d="M29.363,4.637c-3.514-3.516-9.213-3.516-12.727,0L2.046,19.054c-2.729,2.729-2.729,7.171,0,9.9  c2.729,2.729,7.17,2.729,9.898,0l14.59-14.418c1.953-1.953,1.953-5.118,0-7.071c-1.953-1.952-5.119-1.952-7.07,0L8.496,18.433  c-0.391,0.392-0.391,1.023,0,1.415c0.391,0.391,1.023,0.391,1.414,0L20.879,8.879c1.17-1.169,3.072-1.169,4.242,0  c1.17,1.17,1.17,3.073,0,4.243l-14.59,14.417c-1.953,1.953-5.117,1.953-7.07,0c-1.953-1.952-1.953-5.118,0-7.07L17.908,6.192  c2.734-2.734,7.168-2.734,9.898,0c2.736,2.735,2.736,7.165,0.002,9.899L16.982,26.918c-0.393,0.392-0.393,1.023,0,1.414  c0.391,0.392,1.023,0.392,1.414,0l10.967-10.968C32.879,13.85,32.879,8.151,29.363,4.637z" fill="#333333" id="clip_2_"/>
        </svg>
    </div>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    // eslint-disable-next-line no-underscore-dangle
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('textarea');
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.setAttribute(name, newValue);
  }

  get value() {
    return this.$input.value;
  }

  _reset() {
    this.$input.value = '';
  }
}

customElements.define('form-input', FormInput);
