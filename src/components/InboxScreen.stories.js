import React from 'react';
import { Provider } from 'react-redux';
import { rest } from 'msw';

import { InboxScreen } from './InboxScreen';
import { MockedState } from './TaskList.stories';
import store from '../lib/store';

import {
	fireEvent,
	within,
	waitFor,
	waitForElementToBeRemoved,
} from '@storybook/testing-library';

// Indicamos a storybook que componente estamos documentando
export default {
	component: InboxScreen,
	title: 'InboxScreen',
	decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

// Creamos una  "plantilla" de como los args se asignan a la representación.
const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
	msw: {
		handlers: [
			rest.get(
				'https://jsonplaceholder.typicode.com/todos?userId=1',
				(req, res, ctx) => {
					return res(ctx.json(MockedState.tasks));
				}
			),
		],
	},
};

// Prueba de interacción
Default.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	// Espera que el componente transicione al estado de loading
	await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
	// Espera que el componente sea actualizado en base al store
	await waitFor(async () => {
		// Simula el evento pinning en la primera task
		await fireEvent.click(canvas.getByLabelText('pinTask-1'));
		// Simula el evento pinning en la tercera task
		await fireEvent.click(canvas.getByLabelText('pinTask-3'));
	});
};

export const Error = Template.bind({});
Error.parameters = {
	msw: {
		handlers: [
			'https://jsonplaceholder.typicode.com/todos?userId=1',
			(req, res, ctx) => {
				return res(ctx.status(403));
			},
		],
	},
};
