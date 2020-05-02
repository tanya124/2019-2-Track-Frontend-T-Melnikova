/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {connect} from 'react-redux';
import {auth} from '../../actions';



class Logout extends React.Component {
	render() {
		return (
			<div>
				<div style={{textAlign: 'right'}}>
					{this.props.user.username } (<a onClick={this.props.logout}>logout</a>)
				</div>
			</div>
		);
	};
};
  
  
const mapStateToProps = state => {
	return {
		user: state.auth.user,
	};
};
  
const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(auth.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);