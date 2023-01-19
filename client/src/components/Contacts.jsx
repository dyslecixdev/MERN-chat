import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {useTheme, Box, InputBase, Avatar, Typography} from '@mui/material';

import axios from 'axios';

import {
	joinRoomStart,
	joinRoomSuccess,
	joinRoomFailure,
	leaveRoomStart,
	leaveRoomSuccess,
	leaveRoomFailure
} from '../redux/chatRedux';

import {tokens} from '../theme';

function Contacts({socket}) {
	const user = useSelector(state => state.user.currentUser);
	const chatRoom = useSelector(state => state.chat.userId);

	const dispatch = useDispatch();

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');

	// Fetches all the user documents.
	useEffect(() => {
		async function fetchUsers() {
			const res = await axios.get(`http://localhost:5000/users?search=${search}`, {
				headers: {
					Authorization: 'Bearer ' + user.token
				}
			});
			setUsers(res.data);
		}
		fetchUsers();
	}, [search, user.token]);

	// Emits a socket message that you have left a room, then leaves the room.
	const handleWelcome = () => {
		if (!socket) return;

		dispatch(leaveRoomStart());

		try {
			socket.emit('leave-room-from-server', {chatRoom});
			dispatch(leaveRoomSuccess());
		} catch (err) {
			console.log(err);
			dispatch(leaveRoomFailure());
		}
	};

	// Joins a room.
	const handleChatRoom = userId => {
		dispatch(joinRoomStart());
		try {
			dispatch(joinRoomSuccess(userId));
		} catch (err) {
			console.log(err);
			dispatch(joinRoomFailure());
		}
	};

	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				borderRight:
					theme.palette.mode === 'dark'
						? `1px solid ${colors.secondary[100]}`
						: `1px solid ${colors.primary[100]}`
			}}
		>
			{/* Search Bar */}
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					background: colors.primary[700]
				}}
			>
				<Box
					sx={{
						width: '80%',
						display: 'flex',
						background: colors.secondary[100],
						borderRadius: '3px'
					}}
				>
					<InputBase
						sx={{ml: 2, flex: 1, color: colors.primary[900]}}
						placeholder='Search for a user'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</Box>
			</Box>

			{/* Contacts List */}
			<Box
				sx={{
					flex: 4,
					overflowY: 'scroll',
					// Styles the scrollbar.
					'&::-webkit-scrollbar': {
						width: '1rem',
						// Styles the scrollbar thumb.
						'&-thumb': {
							background: colors.blueAccent[600],
							width: '0.1rem',
							borderRadius: '1rem'
						}
					}
				}}
			>
				{users.map(fetchedUser => (
					<Box
						key={fetchedUser._id}
						onClick={() => handleChatRoom(fetchedUser._id)}
						sx={{
							m: 2,
							p: 1,
							display: 'flex',
							alignItems: 'center',
							gap: '40px',
							// Changes the background to green if you are in that user's chatroom.
							background:
								fetchedUser._id === chatRoom
									? colors.greenAccent[500]
									: colors.greyAccent[700],
							borderRadius: '10px',
							cursor: 'pointer'
						}}
					>
						<Avatar
							alt="User's Avatar"
							src={fetchedUser.avatar}
							sx={{
								width: {xs: 60, sm: 80},
								height: {xs: 60, sm: 80},
								ml: 2
							}}
						/>
						<Typography variant='h4' component='span'>
							{fetchedUser.username}
						</Typography>
					</Box>
				))}
			</Box>

			{/* User Info */}
			<Box
				onClick={handleWelcome}
				sx={{
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					gap: '40px',
					background: colors.primary[700],
					cursor: 'pointer'
				}}
			>
				<Avatar
					alt="User's Avatar"
					src={user.avatar}
					sx={{
						width: {xs: 60, sm: 80},
						height: {xs: 60, sm: 80},
						ml: 2
					}}
				/>
				<Typography variant='h4' component='span'>
					{user.username}
				</Typography>
			</Box>
		</Box>
	);
}

export default Contacts;