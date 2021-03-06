/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable indent */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import {auth} from '../../actions';


class Login extends Component {

  onSubmit = e => {
  	e.preventDefault();
  	this.props.login(this.state.username, this.state.password);
  };

  render() {
	if (this.props.isAuthenticated) {
		return <Redirect to="/2019-2-Track-Frontend-T-Melnikova/" />;
	}
	return (
		<form onSubmit={this.onSubmit}>
		  <fieldset>
			<legend>Login</legend>
			{this.props.errors.length > 0 && (
			  <ul>
				{this.props.errors.map(error => (
				  <li key={error.field}>{error.message}</li>
				))}
			  </ul>
			)}
			<legend>Login</legend>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <button type="submit">Login</button>
          </p>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
		  </fieldset>
		</form>
	);
	}
}

const mapStateToProps = state => {
	let errors = [];
	if (state.auth.errors) {
	  errors = Object.keys(state.auth.errors).map(field => {
		return {field, message: state.auth.errors[field]};
	  });
	}
	return {
	  errors,
	  isAuthenticated: state.auth.isAuthenticated
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
	  login: (username, password) => {
		return dispatch(auth.login(username, password));
	  }
	};
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);