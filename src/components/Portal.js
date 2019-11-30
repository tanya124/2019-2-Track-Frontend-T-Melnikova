import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropType from 'prop-types';

class Portal extends Component {
	elem = document.createElement('div');
	
	componentDidMount() {
		document.body.appendChild(this.elem);
	}

	componentWillUnmount() {
		document.body.removeChild(this.elem);
	}

	render() {
		const { children } = this.props;

		return ReactDOM.createPortal(children, this.elem);
	}
}

Portal.propTypes = {
	children: PropType.element.isRequired,
};

export default Portal;
