import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
/*import SearchButton from './Buttons/SearchButton';
import BurgerButton from './Buttons/BurgerButton';*/

class HeaderMain extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <div className="title">Manage cities</div>
      </div>
    )
  }
}

export default HeaderMain
