import React from 'react'
import { action } from '@storybook/addon-actions'
import BurgerButton from '../../../components/Buttons/BurgerButton'

export default {
  title: 'BurgerButton',
  component: BurgerButton,
}

export const save = () => <BurgerButton changeStateMenu={action('clicked')} />
