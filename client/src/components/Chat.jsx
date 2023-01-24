import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {useTheme, Box, InputBase, IconButton, Typography} from '@mui/material';
import {ArrowCircleUp} from '@mui/icons-material';

import axios from 'axios';

import {tokens} from '../theme';

function Chat({socket}) {
	const user = useSelector(state => state.user.currentUser);
	const otherUser = useSelector(state => state.chat.otherUserId);
	const room = useSelector(state => state.chat.roomId);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [typing, setTyping] = useState(false);
	const [typingTimeout, setTypingTimeout] = useState(null);
	const [typingSender, setTypingSender] = useState(null);
	const [otherUserName, setOtherUserName] = useState('');

	// Emit a socket message that you have joined a room.
	useEffect(() => {
		if (!socket.current) return;

		if (!room) return;

		socket.current.emit('join-room-from-client', {room});
	}, [socket, room]);

	// Fetches the other user's username.
	useEffect(() => {
		async function fetchOtherUserName() {
			try {
				const res = await axios.get(`http://localhost:5000/users/${otherUser}`, {
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				});
				setOtherUserName(res.data.username);
			} catch (err) {
				console.log(err);
			}
		}
		fetchOtherUserName();
	}, [user.token, otherUser]);

	// Fetches all the chatroom's messages.
	useEffect(() => {
		async function fetchMessages() {
			try {
				const res = await axios.get(`http://localhost:5000/messages/${room}`, {
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				});
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		fetchMessages();
	}, [user.id, user.token, otherUser, room, newMessage]);

	// Receives socket emissions from the server.
	useEffect(() => {
		if (!socket.current) return;

		socket.current.on('send-message-from-server', ({message}) =>
			// Updates the receiver's messages without reloading the browser.
			setMessages(prev => [
				...prev,
				{
					chatId: message.chatId,
					createdAt: message.createdAt,
					receiverId: message.receiverId,
					senderId: message.senderId,
					text: message.text,
					updatedAt: message.updatedAt,
					_id: message._id
				}
			])
		);

		socket.current.on('typing-started-from-server', ({sender}) => addSender({sender}));

		socket.current.on('typing-stopped-from-server', () => removeSender());
	}, [socket]);

	// Creates a message.
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await axios.post(
				'http://localhost:5000/messages',
				{
					chatId: room,
					senderId: user.id,
					receiverId: otherUser,
					text: newMessage
				},
				{
					headers: {
						Authorization: 'Bearer ' + user.token
					}
				}
			);
			socket.current.emit('send-message-from-client', {message: res.data, room});
			setNewMessage('');
		} catch (err) {
			setErrorMessage(err.response.data);
			console.log(err);
		}
	};

	// Whenever you start or stop typing, set the new message in state, then emit a message to the server.
	const handleInput = e => {
		setNewMessage(e.target.value);

		socket.current.emit('typing-started-from-client', {room, sender: user.id});

		if (typingTimeout) clearTimeout(typingTimeout);

		setTypingTimeout(
			setTimeout(() => {
				socket.current.emit('typing-stopped-from-client', {room});
			}, 1000)
		);
	};

	// Sets typing to true and the typing sender as a user id.
	const addSender = ({sender}) => {
		setTyping(true);
		setTypingSender(sender);
	};

	// Sets typing to false and the typing sender to null.
	const removeSender = () => {
		setTyping(false);
		setTypingSender(null);
	};

	return (
		<Box
			sx={{
				flex: 2,
				p: 1,
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				background: theme.palette.mode === 'light' && colors.secondary[700]
			}}
		>
			<Box sx={{flex: 1}}>
				<Typography variant='h3' sx={{display: 'flex', justifyContent: 'center'}}>
					{user.username} and {otherUserName}'s chat room
				</Typography>
			</Box>

			{/* Message Container */}
			<Box sx={{flex: 8}}>
				{messages.map(message => (
					<Box
						key={message._id}
						sx={{
							minWidth: '50%',
							mt: 2,
							p: 1,
							background:
								message.senderId === user.id
									? colors.greenAccent[500]
									: colors.blueAccent[500],
							borderRadius: '10px',
							textAlign: message.senderId === user.id ? 'left' : 'right'
						}}
					>
						{message.text}
					</Box>
				))}
				{typing && (
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: user.id === typingSender ? 'flex-start' : 'flex-end'
						}}
					>
						<Box
							sx={{
								width: '60px',
								height: '50px',
								mt: 2,
								p: 1,
								background:
									user.id === typingSender
										? colors.greenAccent[500]
										: colors.blueAccent[500],
								borderRadius: '10px'
							}}
						>
							<Typography
								variant='h3'
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								...
							</Typography>
						</Box>
					</Box>
				)}
			</Box>

			{/* Message Field */}
			<Box
				sx={{
					width: '100%',
					p: 2,
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				{errorMessage && (
					<Typography color='error' sx={{textAlign: 'center'}}>
						{errorMessage}
					</Typography>
				)}
				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{
						width: '100%',
						display: 'flex',
						background:
							theme.palette.mode === 'dark'
								? colors.secondary[100]
								: colors.greyAccent[100],
						borderRadius: '3px'
					}}
				>
					<InputBase
						placeholder='Type a message'
						value={newMessage}
						onChange={handleInput}
						sx={{
							ml: 2,
							flex: 1,
							color:
								theme.palette.mode === 'dark'
									? colors.primary[900]
									: colors.secondary[900]
						}}
					/>
					<IconButton
						type='submit'
						sx={{
							p: 1,
							color:
								theme.palette.mode === 'dark'
									? colors.primary[900]
									: colors.primary[900]
						}}
					>
						<ArrowCircleUp />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}

export default Chat;
