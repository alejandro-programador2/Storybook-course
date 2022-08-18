import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTasks } from '../lib/store';
import { TaskList } from './TaskList';

export const InboxScreen = () => {
	const dispatch = useDispatch();

	// Estamos obtieniendo el campo error del state actualizado
	const { error } = useSelector((state) => state.taskbox);

	// Efecto que dispara la obtención de la informaicón
	// cuando el componente es montado
	useEffect(() => {
		dispatch(fetchTasks());
	}, []);

	if (error) {
		return (
			<div className='page lists-show'>
				<div className='wrapper-message'>
					<span className='icon-face-sad' />
					<p className='title-message'>Oh no!</p>
					<p className='subtitle-message'>Something went wrong</p>
				</div>
			</div>
		);
	}

	return (
		<div className='page lists-show'>
			<nav>
				<h1 className='title-page'>Taskbox</h1>
			</nav>
			<TaskList />
		</div>
	);
};
