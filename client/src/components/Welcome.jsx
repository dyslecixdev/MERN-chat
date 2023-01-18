import {useSelector} from 'react-redux';

import {useTheme, Box, Card, CardMedia, CardContent, Typography} from '@mui/material';

import {tokens} from '../theme';

import Robot from '../assets/waving-robot.gif';

function Welcome() {
	const user = useSelector(state => state.user.currentUser);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box sx={{flex: 2, p: 1}}>
			<Card elevation={0} sx={{width: '100%', height: '100%', background: 'transparent'}}>
				<CardMedia sx={{height: '70%'}} image={Robot} title='green iguana' />
				<CardContent
					sx={{
						mt: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '1rem'
					}}
				>
					<Typography variant='h2' component='div'>
						Welcome, {user.username}!
					</Typography>
					<Typography variant='h3' sx={{color: colors.blueAccent[400]}}>
						Start a message with a contact on the left.
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}

export default Welcome;
