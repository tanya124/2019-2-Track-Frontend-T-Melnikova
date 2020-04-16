import React from 'react'
import renderer from 'react-test-renderer'
import InfoButton from '../components/Buttons/InfoButton'

it('renders correctly', () => {
  const tree = renderer.create(<InfoButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
