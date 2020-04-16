import React from 'react';
import { action } from '@storybook/addon-actions';
import Save from '../../../components/Buttons/SaveButton';

export default {
	title: 'Save',
	component: Save,
};

export const save = () => <Save saveData={action('clicked')} />;
