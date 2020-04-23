import React from 'react';
import renderer from 'react-test-renderer';
import HeaderChats from '../components/HeaderChats';

it('renders correctly', () => {
	const tree = renderer.create(<HeaderChats />).toJSON();
	expect(tree).toMatchSnapshot();
});
