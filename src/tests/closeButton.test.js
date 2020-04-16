import React from 'react';
import renderer from 'react-test-renderer';
import CloseButton from '../components/Buttons/CloseButton';

it('renders correctly', () => {
	const tree = renderer.create(<CloseButton handleModal={jest.fn()} />).toJSON();
	expect(tree).toMatchSnapshot();
});
