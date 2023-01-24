import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		otherUserId: null,
		roomId: null,
		isFetching: false,
		error: false
	},
	reducers: {
		createRoomStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		createRoomSuccess: (state, action) => {
			state.otherUserId = action.payload.otherUserId;
			state.roomId = action.payload.roomId;
			state.isFetching = false;
		},
		createRoomFailure: state => {
			state.isFetching = false;
			state.error = true;
		},
		joinRoomStart: state => {
			state.isFetching = true;
			state.error = false;
		},
		joinRoomSuccess: (state, action) => {
			state.otherUserId = action.payload.otherUserId;
			state.roomId = action.payload.roomId;
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
			state.otherUserId = null;
			state.roomId = null;
			state.isFetching = false;
		},
		leaveRoomFailure: state => {
			state.isFetching = false;
			state.error = true;
		}
	}
});

export const {
	createRoomStart,
	createRoomSuccess,
	createRoomFailure,
	joinRoomStart,
	joinRoomSuccess,
	joinRoomFailure,
	leaveRoomStart,
	leaveRoomSuccess,
	leaveRoomFailure
} = chatSlice.actions;

export default chatSlice.reducer;
