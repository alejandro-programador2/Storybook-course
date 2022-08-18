import React from 'react';
// Importamos el componente Task
import { Task } from './Task';

// Indica a storybook que componente estamos documentando
export default {
	// Componente
	component: Task,
	// Referencia del componente en la barra de storybook
	title: 'Task',
};

// Construcción de los tres estados de prueba de task
const Template = (args) => <Task {...args} />;

// Estado por defecto
export const Default = Template.bind({}); // Copia de una función JS.
Default.args = {
	task: {
		id: '1',
		title: 'Test Task',
		state: 'TASK_INBOX',
	},
};

// Estado cuando está fijado
export const Pinned = Template.bind({});
Pinned.args = {
	task: {
		...Default.args.task,
		state: 'TASK_PINNED',
	},
};

// Estado cuando está archivado
export const Archived = Template.bind({});
Archived.args = {
	task: {
		...Default.args.task,
		state: 'TASK_ARCHIVED',
	},
};

// Estado con texto largo
const longTitleString =
	"This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!";

export const LongTitle = Template.bind({});
LongTitle.args = {
	task: {
		...Default.args.task,
		title: longTitleString,
	},
};
