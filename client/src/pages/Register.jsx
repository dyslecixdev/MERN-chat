import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {Box, TextField, Button, Paper, Typography} from '@mui/material';

import axios from 'axios';

import {loginStart, loginSuccess, loginFailure} from '../redux/userRedux';

function Register() {
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
			const res = await axios.post('http://localhost:5000/users/register', {
				username,
				email,
				password,
				confirmPassword,
				avatar: '',
				isAdmin: false
			});
			dispatch(loginSuccess(res.data)); // Sends the data as an action payload to the reducer function
			navigate('http://localhost:3000/avatar');
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
					background: 'white'
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
					required
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<TextField
					label='Email'
					type='email'
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<TextField
					label='Password'
					type='password'
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<TextField
					label='Confirm Password'
					type='password'
					required
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
				<Button variant='contained' type='submit' disabled={isFetching}>
					Register
				</Button>
				<Typography variant='p'>
					Already have an account? Click{' '}
					<Link to='/login' style={{color: 'blue', textDecoration: 'none'}}>
						here
					</Link>
					.
				</Typography>
			</Paper>
		</Box>
	);
}

export default Register;
