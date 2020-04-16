import React from 'react';
import { action } from '@storybook/addon-actions';
import CloseButton from '../../../components/Buttons/CloseButton';

export default {
	title: 'CloseButton',
	component: CloseButton,
};

export const save = () => <CloseButton handleModal={action('clicked')} />;
