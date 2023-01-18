import {useTheme, Box} from '@mui/material';

import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Chat from '../components/Chat';

import {tokens} from '../theme';

function Home() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const currChat = false;

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
					width: '80%',
					height: '90%',
					display: 'flex',
					border:
						theme.palette.mode === 'dark'
							? `1px solid ${colors.secondary[100]}`
							: `1px solid ${colors.primary[100]}`,
					borderRadius: '5px'
				}}
			>
				<Contacts />
				{currChat ? <Chat /> : <Welcome />}
			</Box>
		</Box>
	);
}

export default Home;
