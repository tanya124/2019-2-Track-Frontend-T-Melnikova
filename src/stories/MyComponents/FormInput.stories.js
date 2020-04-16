import React from 'react'
import { action } from '@storybook/addon-actions'
import FormInput from '../../components/FormInput'

export default {
  title: 'FormInput',
  component: FormInput,
}

export const save = () => <FormInput createMessage={action('submit message')} />
