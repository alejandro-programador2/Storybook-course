import {
	configureStore,
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';

// The initial state of our store when the app loads.
const TaskBoxData = {
	tasks: [],
	status: 'idle',
	error: null,
};

// Createa an asyncThunk to fetch tasks from a remote endpoint
export const fetchTasks = createAsyncThunk('todos/fecthTodos', async () => {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/todos?userId=1'
	);

	const data = await response.json();

	const result = data.map((task) => ({
		id: `${task.id}`,
		title: task.title,
		state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
	}));

	return result;
});

// The store is created here.
const TasksSlice = createSlice({
	name: 'taskbox',
	initialState: TaskBoxData,
	reducers: {
		updateTaskState: (state, action) => {
			const { id, newTaskState } = action.payload;
			const task = state.tasks.findIndex((task) => task.id === id);
			if (task >= 0) {
				state.tasks[task].state = newTaskState;
			}
		},
	},
	// Extends the reducer from the async actions
	extraReducers(builder) {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = 'loading';
				state.error = null;
				state.tasks = [];
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = null;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state) => {
				state.status = 'falied';
				state.error = 'Something went wrong';
				state.tasks = [];
			});
	},
});

// The actions containeed in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

// Our app's store configuration goes here
const store = configureStore({
	reducer: {
		taskbox: TasksSlice.reducer,
	},
});

export default store;
