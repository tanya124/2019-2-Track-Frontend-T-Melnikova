import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import HeaderChat from '../../components/HeaderChat'
import store from '../../store'

export default {
  title: 'HeaderChat',
  component: HeaderChat,
  decorators: [
    (getStory) => <Provider store={store}>{getStory()}</Provider>,
    (getStory) => <MemoryRouter>{getStory()}</MemoryRouter>,
  ],
}

export const save = () => <HeaderChat chatName="Chat" />
