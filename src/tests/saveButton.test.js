import React from 'react'
import renderer from 'react-test-renderer'
import SearchButton from '../components/Buttons/SearchButton'

it('renders correctly', () => {
  const tree = renderer.create(<SearchButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
