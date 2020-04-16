import React from 'react'
import renderer from 'react-test-renderer'
import AttachButton from '../components/Buttons/AttachButton'

it('renders correctly', () => {
  const tree = renderer.create(<AttachButton changeMenu={jest.fn()} />).toJSON()
  expect(tree).toMatchSnapshot()
})
