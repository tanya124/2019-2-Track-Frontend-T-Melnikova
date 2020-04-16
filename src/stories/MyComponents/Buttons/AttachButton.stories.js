import React from 'react'
import { action } from '@storybook/addon-actions'
import AttachButton from '../../../components/Buttons/AttachButton'

export default {
  title: 'AttachButton',
  component: AttachButton,
}

export const save = () => <AttachButton changeMenu={action('clicked')} />
