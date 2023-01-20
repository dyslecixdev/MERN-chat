import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {useTheme, useMediaQuery, Box} from '@mui/material';

import {io} from 'socket.io-client';

import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Chat from '../components/Chat';

import {tokens} from '../theme';

function Home() {
	const chatRoom = useSelector(state => state.chat.userId);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const isNonMobile = useMediaQuery('(min-width:1250px)'); // If the viewport's min-width is 1250px, then isNonMobile is true.

	const [socket, setSocket] = useState(null);

	// Sets the socket to the server's localhost.
	useEffect(() => {
		setSocket(io('http://localhost:5000'));
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
				{chatRoom ? <Chat socket={socket} /> : <Welcome socket={socket} />}
			</Box>
		</Box>
	);
}

export default Home;
