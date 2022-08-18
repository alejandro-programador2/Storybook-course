import React from 'react';
// Importamos el componente TaskList
import { TaskList } from './TaskList';

// Importamos todo de Task.stories
import * as TaskStories from './Task.stories';

// Métodos del react-redux
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Una simple prueba del estado del store
export const MockedState = {
	tasks: [
		{ ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
		{ ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
		{ ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
		{ ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
		{ ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
		{ ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
	],
	status: 'idle',
	error: null,
};

// Una simple prueba del store de redux
const Mockstore = ({ taskboxState, children }) => (
	<Provider
		store={configureStore({
			reducer: {
				taskbox: createSlice({
					name: 'taskbox',
					initialState: taskboxState,
					reducers: {
						updateTaskState: (state, action) => {
							const { id, newTaskState } = action.payload;
							const task = state.tasks.findIndex((task) => task.id === id);
							if (task >= 0) {
								state.tasks[task].state = newTaskState;
							}
						},
					},
				}).reducer,
			},
		})}
	>
		{children}
	</Provider>
);

// Indica a storybook que componente estamos documentando
export default {
	component: TaskList,
	title: 'TaskList',
	// Proporciona un envoltorio arbitrario a la historia.
	decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
	// Evita que nuestro estado simulado sea tratado como una historia
	excludeStories: /.*MockedState$/,
};

// Creamos una  "plantilla" de como los args se asignan a la representación.
const Template = (_) => <TaskList />;

// Cada historia reutiliza el Template
export const Default = Template.bind({}); // Copia de una función JS.
Default.decorators = [
	(story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
];

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.decorators = [
	(story) => {
		const pinnedtasks = [
			...MockedState.tasks.slice(0, 5),
			{ id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
		];

		return (
			<Mockstore
				taskboxState={{
					...MockedState,
					tasks: pinnedtasks,
				}}
			>
				{story()}
			</Mockstore>
		);
	},
];

export const Loading = Template.bind({});
Loading.decorators = [
	(story) => (
	  <Mockstore
		taskboxState={{
		  ...MockedState,
		  status: 'loading',
		}}
	  >
		{story()}
	  </Mockstore>
	),
  ];

export const Empty = Template.bind({});
Empty.decorators = [
	(story) => (
	  <Mockstore
		taskboxState={{
		  ...MockedState,
		  tasks: [],
		}}
	  >
		{story()}
	  </Mockstore>
	),
  ];
