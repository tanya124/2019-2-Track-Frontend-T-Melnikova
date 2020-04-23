import React from 'react'
import '../styles/Modal.css'
import styled from '@emotion/styled'
import close from '../assets/cross.svg'

const Button = styled.img`
  width: 1.5em;
  margin-right: 10px;
  &:hover {
    filter: invert(1);
  }
`

function CloseButton(props) {
  return <Button src={close} onClick={() => props.handleModal()} />
}

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      inputText: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { inputText } = this.state
    const name = inputText
    this.setState({
      inputText: '',
    })
    this.props.createChat(name)
    this.props.handleModal()
  }

  render() {
    const { inputText } = this.state
    return (
      <div className="modalOverlay">
        <div className="modalWindow">
          <div className="modalHeader">
            <p>Новый чат</p>
            <CloseButton handleModal={this.props.handleModal} />
          </div>
          <input
            className="modalBody"
            type="text"
            value={inputText}
            onChange={this.handleInputChange}
            placeholder="Введите имя собеседника"
            autoComplete="off"
            height="30"
            border="0"
          />
          <div className="modalFooter">
            <input type="button" value="Создать чат" onClick={this.handleSubmit} />
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
