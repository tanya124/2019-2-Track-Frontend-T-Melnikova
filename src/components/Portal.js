import { Component } from 'react';
import ReactDOM from 'react-dom';

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

export default Portal;