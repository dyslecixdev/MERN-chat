import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {useTheme, Box, TextField, Button, Paper, Typography} from '@mui/material';

import axios from 'axios';

import {loginStart, loginSuccess, loginFailure} from '../redux/userRedux';

import {tokens} from '../theme';

function Register() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();
	const {isFetching} = useSelector(state => state.user);

	const navigate = useNavigate();

	// Registers a user then logs into the app
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axios.post(
				'https://mern-chat-backend-xm9q.onrender.com/users/register',
				{
					username,
					email,
					password,
					confirmPassword,
					avatar: '',
					isAdmin: false
				}
			);
			dispatch(loginSuccess(res.data)); // Sends the data as an action payload to the reducer function
			navigate('https://mern-chat-frontend.onrender.com/avatar');
		} catch (err) {
			setErrorMessage(err.response.data); // Sets the error message from the server side
			dispatch(loginFailure());
		}
	};

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Paper
				elevation={3}
				component='form'
				onSubmit={handleSubmit}
				sx={{
					width: {
						xs: '100%',
						sm: '90%',
						md: '75%',
						lg: '50%',
						xl: '40%'
					},
					padding: '1rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem',
					background:
						theme.palette.mode === 'dark' ? colors.primary[800] : colors.secondary[100]
				}}
			>
				{errorMessage && (
					<Typography color='error' sx={{textAlign: 'center'}}>
						{errorMessage}
					</Typography>
				)}
				<TextField
					label='Username'
					type='text'
					color='info'
					required
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<TextField
					label='Email'
					type='email'
					color='info'
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<TextField
					label='Password'
					type='password'
					color='info'
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<TextField
					label='Confirm Password'
					type='password'
					color='info'
					required
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
				<Button variant='contained' color='info' type='submit' disabled={isFetching}>
					Register
				</Button>
				<Typography variant='p'>
					Already have an account? Click{' '}
					<Link
						to='/login'
						style={{
							color:
								theme.palette.mode === 'dark'
									? colors.blueAccent[600]
									: colors.blueAccent[400],
							textDecoration: 'none'
						}}
					>
						here
					</Link>
					.
				</Typography>
			</Paper>
		</Box>
	);
}

export default Register;
