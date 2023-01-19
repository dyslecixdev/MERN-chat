import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		userId: null,
		isFetching: false,
		error: false
	},
	reducers: {
		joinRoomStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		joinRoomSuccess: (state, action) => {
			state.userId = action.payload;
			state.isFetching = false;
		},
		joinRoomFailure: state => {
			state.isFetching = false;
			state.error = true;
		},
		leaveRoomStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		leaveRoomSuccess: state => {
			state.userId = null;
			state.isFetching = false;
		},
		leaveRoomFailure: state => {
			state.isFetching = false;
			state.error = true;
		}
	}
});

export const {
	joinRoomStart,
	joinRoomSuccess,
	joinRoomFailure,
	leaveRoomStart,
	leaveRoomSuccess,
	leaveRoomFailure
} = chatSlice.actions;

export default chatSlice.reducer;
