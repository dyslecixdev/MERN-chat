import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {useTheme, Box, InputBase, IconButton} from '@mui/material';
import {Search} from '@mui/icons-material';

import {tokens} from '../theme';

function Chat({socket}) {
	const chatRoom = useSelector(state => state.chat.userId);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [message, setMessage] = useState('');

	// Emit a socket message that you have joined a room.
	useEffect(() => {
		if (!socket) return;

		socket.emit('join-room-from-server', {chatRoom});
	}, [socket, chatRoom]);

	return (
		<Box sx={{flex: 2, p: 1, display: 'flex', flexDirection: 'column', gap: '5px'}}>
			{/* Message Container */}
			<Box sx={{flex: 9}}>Message to be shown here</Box>

			{/* Message Field */}
			<Box sx={{width: '100%', p: 2, display: 'flex', justifyContent: 'space-between'}}>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						background: colors.secondary[100],
						borderRadius: '3px'
					}}
				>
					<InputBase
						placeholder='Type a message'
						value={message}
						onChange={e => setMessage(e.target.value)}
						sx={{ml: 2, flex: 1, color: colors.primary[900]}}
					/>
					<IconButton type='button' sx={{p: 1, color: colors.primary[900]}}>
						<Search />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}

export default Chat;
