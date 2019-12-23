import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/CityList.css'
import plus from '../../assets/plus.svg'

function Container(props) {
  const { city, country, icon, temperature } = props
  return (
    <div className="block">
      <div className="city-name">{city}</div>
      <div className="icon"></div>
      <temperature>{temperature}</temperature>
      <div className="tmp">°С</div>
    </div>
  )
}

function Modal() {
  return <div />
}

class CityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      locations: JSON.parse(localStorage.getItem('locations')) || [],
    }

    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    this.setState(() => ({
      modalIsOpen: true,
    }))
  }

  render() {
    const { locations } = this.state
    return (
      <div>
        {this.state.modalIsOpen && <Modal handleModal={this.closeModal} createChat={this.createChat} />}
        <div className="list">
          {locations.map((location) => (
            <Container
              key={location.id}
              id={location.id}
              city={location.city}
              country={location.country}
              icon={'icon'}
              temperature={location.temperature}
            />
          ))}
          <img className="create-location" src={plus} onClick={() => this.openModal()} />
        </div>
      </div>
    )
  }
}

export default CityList
