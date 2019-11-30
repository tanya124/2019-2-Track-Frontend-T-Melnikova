import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropType from 'prop-types';

class Portal extends Component {
	componentDidMount() {
		document.body.appendChild(this.elem);
	}

	componentWillUnmount() {
		document.body.removeChild(this.elem);
	}

	elem = document.createElement('div');

	render() {
		const { children } = this.props;

		return ReactDOM.createPortal(children, this.elem);
	}
}

Portal.propTypes = {
	children: PropType.element.isRequired,
};

export default Portal;
