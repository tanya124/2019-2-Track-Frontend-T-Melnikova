import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { action } from '@storybook/addon-actions'
import Profile from '../../components/Profile'
import store from '../../store'

export default {
  title: 'Profile',
  component: Profile,
  decorators: [
    (getStory) => <Provider store={store}>{getStory()}</Provider>,
    (getStory) => <MemoryRouter>{getStory()}</MemoryRouter>,
  ],
}

const State = {
  fullName: 'Kek',
  userName: '@kek',
  bio: '2',
}

export const save = () => (
  <Profile
    state={State}
    setFullName={action('set name')}
    setUserName={action('set usename')}
    setBio={action('set bio')}
  />
)
