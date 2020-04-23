import React from 'react';
import renderer from 'react-test-renderer';
import Save from '../components/Buttons/SaveButton';

it('renders correctly', () => {
	const tree = renderer.create(<Save saveData={jest.fn()} />).toJSON();
	expect(tree).toMatchSnapshot();
});
