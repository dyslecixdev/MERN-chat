import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {useTheme, Box, InputBase, Avatar, Typography} from '@mui/material';

import axios from 'axios';

import {
	createRoomStart,
	createRoomSuccess,
	createRoomFailure,
	joinRoomStart,
	joinRoomSuccess,
	leaveRoomStart,
	leaveRoomSuccess,
	leaveRoomFailure
} from '../redux/chatRedux';

import {tokens} from '../theme';

function Contacts({socket, isNonMobile}) {
	const user = useSelector(state => state.user.currentUser);
	const otherUser = useSelector(state => state.chat.otherUserId);
	const room = useSelector(state => state.chat.roomId);

	const dispatch = useDispatch();

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');

	// Fetches all the users.
	useEffect(() => {
		async function fetchUsers() {
			try {
				const res = await axios.get(`http://localhost:5000/users?search=${search}`, {
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				});
				setUsers(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchUsers();
	}, [search, user.token]);

	// Leaves a chatroom.
	const leaveChat = () => {
		if (!socket.current) return;

		dispatch(leaveRoomStart());

		try {
			socket.current.emit('leave-room-from-client', {room});
			dispatch(leaveRoomSuccess());
		} catch (err) {
			console.log(err);
			dispatch(leaveRoomFailure());
		}
	};

	// Creates or joins a chatroom.
	const joinChat = otherUserId => {
		leaveChat();

		// Creates a new chatroom between two users.
		async function createChat() {
			dispatch(createRoomStart(otherUserId));
			try {
				const res = await axios.post(
					'http://localhost:5000/chats',
					{
						senderId: user.id,
						receiverId: otherUserId
					},
					{
						headers: {
							Authorization: 'Bearer ' + user.token
						}
					}
				);
				dispatch(createRoomSuccess({otherUserId, roomId: res.data._id}));
			} catch (err) {
				console.log(err);
				dispatch(createRoomFailure());
			}
		}

		// Fetches an existing chatroom between two users.
		async function fetchChat(otherUserId) {
			dispatch(joinRoomStart());
			try {
				const res = await axios.get(
					`http://localhost:5000/chats/${user.id}/${otherUserId}`,
					{
						headers: {
							Authorization: 'Bearer ' + user.token
						}
					}
				);
				dispatch(joinRoomSuccess({otherUserId, roomId: res.data._id}));
			} catch {
				createChat(otherUserId);
			}
		}

		fetchChat(otherUserId);
	};

	return (
		<Box
			sx={{
				flex: isNonMobile && 1,
				width: !isNonMobile && '120px',
				display: 'flex',
				flexDirection: 'column',
				background: theme.palette.mode === 'light' && colors.secondary[700],
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
					background:
						theme.palette.mode === 'dark' ? colors.primary[700] : colors.greyAccent[100]
				}}
			>
				<Box
					sx={{
						width: '80%',
						display: 'flex',
						background:
							theme.palette.mode === 'dark'
								? colors.secondary[100]
								: colors.secondary[900],
						borderRadius: '3px'
					}}
				>
					<InputBase
						sx={{
							ml: 2,
							flex: 1,
							color:
								theme.palette.mode === 'dark'
									? colors.primary[900]
									: colors.primary[100]
						}}
						placeholder={isNonMobile ? 'Search for a user' : 'Search'}
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
							background:
								theme.palette.mode === 'dark'
									? colors.blueAccent[600]
									: colors.blueAccent[400],
							width: '0.1rem',
							borderRadius: '1rem'
						}
					}
				}}
			>
				{users.map(fetchedUser => (
					<Box
						key={fetchedUser._id}
						onClick={() => joinChat(fetchedUser._id)}
						sx={{
							m: 2,
							p: 1,
							display: 'flex',
							justifyContent: !isNonMobile && 'center',
							alignItems: 'center',
							gap: isNonMobile && '40px',
							// Changes the background to green if you are in that user's chatroom.
							background:
								fetchedUser._id === otherUser
									? colors.greenAccent[500]
									: theme.palette.mode === 'dark'
									? colors.greyAccent[700]
									: colors.greyAccent[800],
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
								ml: isNonMobile && 2
							}}
						/>
						{isNonMobile && (
							<Typography variant='h4' component='span'>
								{fetchedUser.username}
							</Typography>
						)}
					</Box>
				))}
			</Box>

			{/* User Info */}
			<Box
				onClick={leaveChat}
				sx={{
					flex: 1,
					display: 'flex',
					justifyContent: !isNonMobile && 'center',
					alignItems: 'center',
					gap: isNonMobile && '40px',
					background:
						theme.palette.mode === 'dark'
							? colors.primary[700]
							: colors.greyAccent[100],
					color: theme.palette.mode === 'light' && colors.secondary[900],
					cursor: 'pointer'
				}}
			>
				<Avatar
					alt="User's Avatar"
					src={user.avatar}
					sx={{
						width: {xs: 60, sm: 80},
						height: {xs: 60, sm: 80},
						ml: isNonMobile && 2
					}}
				/>
				{isNonMobile && (
					<Typography variant='h4' component='span'>
						{user.username}
					</Typography>
				)}
			</Box>
		</Box>
	);
}

export default Contacts;
