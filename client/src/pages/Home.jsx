import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {useTheme, useMediaQuery, Box} from '@mui/material';

import {io} from 'socket.io-client';

import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Chat from '../components/Chat';

import {tokens} from '../theme';

function Home() {
	const room = useSelector(state => state.chat.roomId);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const socket = useRef();

	const isNonMobile = useMediaQuery('(min-width:1250px)'); // If the viewport's min-width is 1250px, then isNonMobile is true.

	// Connects the socket to the server.
	useEffect(() => {
		socket.current = io('https://mern-chat-backend-xm9q.onrender.com');
	}, []);

	return (
		<Box
			sx={{
				width: '100vw',
				height: '90vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					width: {xs: '100%', md: '80%'},
					height: '90%',
					display: 'flex',
					border:
						theme.palette.mode === 'dark'
							? `1px solid ${colors.secondary[100]}`
							: `1px solid ${colors.primary[100]}`,
					borderRadius: '5px'
				}}
			>
				<Contacts socket={socket} isNonMobile={isNonMobile} />
				{room ? <Chat socket={socket} /> : <Welcome />}
			</Box>
		</Box>
	);
}

export default Home;
