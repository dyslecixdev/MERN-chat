import {createSlice} from '@reduxjs/toolkit';

const messageSlice = createSlice({
	name: 'message',
	initialState: {
		numberOfUnread: 0,
		isFetching: false,
		error: false
	},
	reducers: {
		unreadMessageStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		unreadMessageSuccess: state => {
			state.numberOfUnread++;
			state.isFetching = false;
		},
		unreadMessageFailure: state => {
			state.isFetching = false;
			state.error = true;
		},
		readMessageStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		readMessageSuccess: (state, action) => {
			state.numberOfUnread -= action.payload;
			state.isFetching = false;
		},
		readMessageFailure: state => {
			state.isFetching = false;
			state.error = true;
		}
	}
});

export const {
	unreadMessageStart,
	unreadMessageSuccess,
	unreadMessageFailure,
	readMessageStart,
	readMessageSuccess,
	readMessageFailure
} = messageSlice.actions;

export default messageSlice.reducer;
