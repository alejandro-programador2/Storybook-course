import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Task } from './Task';
import { updateTaskState } from '../lib/store';

export const TaskList = () => {
	// Recuperamos nuestro estado del store
	const tasks = useSelector((state) => {
		const tasksInOrder = [
			...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
			...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
		];

		const filteredTasks = tasksInOrder.filter(
			(t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
		);

		return filteredTasks;
	});

	// Obtenemos el status de nuestro state
	const { status } = useSelector((state) => state.taskbox);

	// Metodo para disparar acciones
	const dispatch = useDispatch();

	const pinTask = (value) => {
		// Disparamos el evento Pinned de vuelta a nuestra tienda
		dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
	};
	const archiveTask = (value) => {
		// Disparamos el evento Archive de vuelta a nuestra tienda
		dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
	};

	const LoadingRow = (
		<div className='loading-item'>
			<span className='glow-checkbox' />
			<span className='glow-text'>
				<span>Loading</span> <span>cool</span> <span>state</span>
			</span>
		</div>
	);

	// Si el status es de tipo loading
	if (status === 'loading') {
		return (
			<div className='list-items' data-testid='loading' key={'loading'}>
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
			</div>
		);
	}

	// Si no hay task
	if (tasks.length === 0) {
		return (
			<div className='list-items' key={'empty'} data-testid='empty'>
				<div className='wrapper-message'>
					<span className='icon-check' />
					<p className='title-message'>You have no tasks</p>
					<p className='subtitle-message'>Sit back and relax</p>
				</div>
			</div>
		);
	}

	return (
		<div className='list-items' data-testid="success" key={"success"}>
			{tasks.map((task) => (
				<Task
					key={task.key}
					task={task}
					onPinTask={(task) => pinTask(task)}
					onArchiveTask={(task) => archiveTask(task)}
				/>
			))}
		</div>
	);
};

// TaskList.propTypes = {
// 	loading: PropTypes.bool,
// 	task: PropTypes.arrayOf(Task.propTypes.task).isRequired,
// 	onPinTask: PropTypes.func,
// 	onArchiveTask: PropTypes.func,
// };

// TaskList.defaultProps = {
// 	loading: false,
// };
